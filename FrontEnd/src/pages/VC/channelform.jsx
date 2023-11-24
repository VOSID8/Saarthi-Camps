import React, { useState } from "react";

const ChannelForm = ({ selectChannel }) => {
  const [channel, setChannel] = useState("");

  const onChange = (e) => {
    let { name, value } = e.target;
    setChannel(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submiting ", channel);
    selectChannel(channel);
    setChannel("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Channel Name</label>
        <input
          placeholder="Channel Name"
          name="channel"
          value={channel}
          onChange={onChange}
        />
        <input type="submit" value="Join Channel" />
      </form>
    </div>
  );
};

export default ChannelForm;
