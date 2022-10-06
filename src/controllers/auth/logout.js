const { Session } = require('../../models');

const logout = async (req, res) => {
  const { token } = req.user;
  await Session.create({token});
  res.json('logout success');
};

module.exports = logout;
