const { Session, User } = require('../../models');

const logout = async (req, res) => {
  const { _id, token } = req.user;
  await Session.create({token});
  await User.findByIdAndUpdate(_id, { token: '' });
  
  res.json('logout success');
};

module.exports = logout;
