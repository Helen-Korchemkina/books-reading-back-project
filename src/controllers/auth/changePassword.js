const { RequestError } = require("../../helpers");
const { OTP, User } = require("../../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = process.env;

const changePassword = async (req, res) => {
    const { token, password } = req.body;
    const oneTimeData = await OTP.findOne({ token });
    if (!oneTimeData) { throw RequestError(404, 'Not Found') };

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user) { throw RequestError(404, 'Not found') };

    const hashPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, { password: hashPassword });
    await OTP.findByIdAndRemove({_id: oneTimeData._id})

    res.json({
        message: 'Password change success'
    });
};

module.exports = changePassword;