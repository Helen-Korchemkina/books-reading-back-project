const { RequestError, sendEmail } = require("../../helpers");
const { User, OTP } = require("../../models");
const jwt = require('jsonwebtoken');
const { FRONTEND_URL, SECRET_KEY } = process.env;

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) { throw RequestError(404, 'Not Found') };

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    const mail = {
        to: email,
        subject: "Заміна паролю",
        html: `<a href="${FRONTEND_URL}/new-password?token=${token}" target="_blank" > Натисніть для зміни пароля </a>`
    };

    await OTP.create({ token });
    await sendEmail(mail);

    res.json({ message: 'Token has been send' });
};

module.exports = forgotPassword;