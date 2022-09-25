const { RequestError } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { error } = schemas.loginSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message);
        };

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw RequestError(401, 'Email or password is wrong');
        };

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw RequestError(401, 'Email or password is wrong');
        };

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        const data = await User.findByIdAndUpdate(user._id, { token }, { new: true, projection: { name: 1 , email: 1 } });

        res.json({
            token,
            data,
        });

    } catch (error) {
        next(error);
    };
};

module.exports = login;