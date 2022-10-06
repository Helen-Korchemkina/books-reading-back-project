const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const createToken = async id => {
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '100d' });
    return token;
};

module.exports = createToken;
