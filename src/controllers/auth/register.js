const { RequestError } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
    try {
        const { error } = schemas.joiRegisterSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message);
        };

        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw RequestError(409, 'Email in use');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ name, email, password: hashPassword });
        
        res.status(201).json({
            name: result.name,
            email: result.email,
        });

    } catch (error) {
        next(error);
    };
};

module.exports = register;
