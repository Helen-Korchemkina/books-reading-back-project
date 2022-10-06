const { RequestError } = require('../../helpers');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../service/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) { throw RequestError(401, 'Email or password is wrong') };

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) { throw RequestError(401, 'Email or password is wrong') };

  const token = await createToken(user._id);
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  res.json({
    token,
    data,
  });
};

module.exports = login;
