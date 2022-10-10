const { RequestError, sendEmail } = require("../../helpers");
const { User, OTP } = require("../../models");
const jwt = require('jsonwebtoken');
const { changePasswordEmail } = require("../../email");
const { SECRET_KEY } = process.env;

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) { throw RequestError(404, 'Not Found') };

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    const mail = {
        to: email,
        subject: "Change Password",
        html: await changePasswordEmail(token)
    };

    await OTP.create({ token });
    await sendEmail(mail);

    res.json({ message: 'Token has been send' });
};

module.exports = forgotPassword;