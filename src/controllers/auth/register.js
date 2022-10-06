const { RequestError } = require('../../helpers');
const { User } = require('../../models');
const statisticsService = require('../../service/statistics');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../service/user');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) { throw RequestError(409, 'Email in use') };

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword });
  const statistics = await statisticsService.addStatistics(result._id);
  const createdUser = await User.findOne({ email });
  const token = await createToken(createdUser._id);
  const data = {
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email
  };

  res.status(201).json({
    token,
    data,
    statistics,
  });
};

module.exports = register;
