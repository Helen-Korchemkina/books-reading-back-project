const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const currentUser = async (req, res, next) => {
    try {
        const { token } = req.user;
        const user = await User.findOne({ token }, '-password -token');

        if (!user) {
            throw RequestError(404, 'Not found');
        };

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

module.exports = currentUser;