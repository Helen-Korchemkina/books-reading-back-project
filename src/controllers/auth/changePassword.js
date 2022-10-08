const { RequestError } = require("../../helpers");
const { OTP, User } = require("../../models");
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const { otp, password } = req.body;
    const oneTimeData = await OTP.findOne({ otp });
    if (!oneTimeData) { throw RequestError(404, 'Not Found') };

    const user = await User.findOne({ _id: oneTimeData.id});
    if (!user) { throw RequestError(404, 'Not found') };

    const hashPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, { password: hashPassword });
    await OTP.findByIdAndRemove({_id: oneTimeData._id})

    res.json({
        message: 'Password change success'
    });
};

module.exports = changePassword;