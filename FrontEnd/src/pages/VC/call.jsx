import React, { Component, forwardRef } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { APP_ID } from "../../../APP_ID";

const USER_ID = Math.floor(Math.random() * 1000000001);
let client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

class CallClass extends React.Component {
    localStream = AgoraRTC.createStream({
        streamID: USER_ID,
        audio: true,
        video: true,
        screen: false
    });

    state = {
        remoteStreams: []
    };

    componentDidMount() {
        this.initLocalStream();
        this.initClient();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.channel !== this.props.channel && this.props.channel !== "") {
            this.joinChannel();
        }
    }

    initLocalStream = () => {
        let me = this;
        me.localStream.init(
            function () {
                console.log("getUserMedia successfully");
                me.localStream.play("agora_local");
            },
            function (err) {
                console.log("getUserMedia failed", err);
            }
        );
    };

    initClient = () => {
        client.init(
            APP_ID,
            function () {
                console.log("AgoraRTC client initialized");
            },
            function (err) {
                console.log("AgoraRTC client init failed", err);
            }
        );
        this.subscribeToClient();
    };

    subscribeToClient = () => {
        let me = this;
        client.on("stream-added", me.onStreamAdded);
        client.on("stream-subscribed", me.onRemoteClientAdded);

        client.on("stream-removed", me.onStreamRemoved);

        client.on("peer-leave", me.onPeerLeave);
    };

    onStreamAdded = evt => {
        let me = this;
        let stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        me.setState(
            {
                remoteStreams: {
                    ...me.state.remoteStream,
                    [stream.getId()]: stream
                }
            },
            () => {
                // Subscribe after new remoteStreams state set to make sure
                // new stream dom el has been rendered for agora.io sdk to pick up
                client.subscribe(stream, function (err) {
                    console.log("Subscribe stream failed", err);
                });
            }
        );
    };

    joinChannel = () => {
        let me = this;
        client.join(
            null,
            me.props.channel,
            USER_ID,
            function (uid) {
                console.log("User " + uid + " join channel successfully");
                client.publish(me.localStream, function (err) {
                    console.log("Publish local stream error: " + err);
                });

                client.on("stream-published", function (evt) {
                    console.log("Publish local stream successfully");
                });
            },
            function (err) {
                console.log("Join channel failed", err);
            }
        );
    };

    onRemoteClientAdded = evt => {
        let me = this;
        let remoteStream = evt.stream;
        me.state.remoteStreams[remoteStream.getId()].play(
            "agora_remote " + remoteStream.getId()
        );
    };

    render() {
        return (
            <div>
                <div id="agora_local" style={{ width: "400px", height: "400px" }} />
                {Object.keys(this.state.remoteStreams).map(key => {
                    let stream = this.state.remoteStreams[key];
                    let streamId = stream.getId();
                    return (
                        <div
                            key={streamId}
                            id={`agora_remote ${streamId}`}
                            style={{ width: "400px", height: "400px" }}
                        />
                    );
                })}
            </div>
        );
    }
}

const Call = forwardRef((props, ref) => {
    return <CallClass {...props} forwardRef={ref} />
})

export default Call