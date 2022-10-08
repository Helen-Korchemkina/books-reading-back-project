const { RequestError, sendEmail } = require("../../helpers");
const { User, OTP } = require("../../models");
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM');
const { FRONTEND_URL } = process.env;

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) { throw RequestError(404, 'Not Found') };

    const otp = nanoid(25);

    const mail = {
        to: email,
        subject: "Заміна паролю",
        html: `<a href="${FRONTEND_URL}/new-password?otp=${otp}" target="_blank" > Натисніть для зміни пароля </a>`
    };

    await OTP.create({ id: user._id, otp });
    await sendEmail(mail);

    res.json({ message: 'One time password send' });
};

module.exports = forgotPassword;