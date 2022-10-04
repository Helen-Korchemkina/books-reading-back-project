const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { SECRET_KEY } = process.env;

const createToken = async id => {
  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '100d' });
  const data = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true, projection: { name: 1, email: 1 } }
  );

  const allData = { token, data };
  return allData;
};

module.exports = createToken;
