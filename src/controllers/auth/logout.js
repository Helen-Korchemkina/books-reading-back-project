const { User } = require("../../models/user");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.json('logout success');
};

module.exports = logout;