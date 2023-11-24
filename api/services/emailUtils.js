const transporter = require("./email");

const sendTemporaryPassword = async (name, email, password) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Saarthi-Camps: Temporary password email",
        html: `
                <p>Dear ${name},</p>
                <p>Your temporary password is ${password}. You can change it anytime</p>
                `
    }
    transporter.sendMail(mailOptions);
}

const sendPasswordResetEmail = (email, id, token) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Saarthi-Camps: Reset password link",
        html: `
            <p>Click on the link to reset your password. The link is valid only for 10 minutes.</p>
            <a href="http://localhost:3000/user/${id}/${token}">Click here</a>`
    }
    transporter.sendMail(mailOptions);
}

const sendVideoCallEmail = (email, channel, token1, token2) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Saarthi-Camps: Video call link",
        html: `
            <p>Click on the link to attend video call.</p>.
            <a href="http://localhost:3001/${channel}/${token1}/${token2}">Click here</a>`
    }
    transporter.sendMail(mailOptions);
}

module.exports = { sendTemporaryPassword, sendPasswordResetEmail, sendVideoCallEmail };