const changePassword = require('./changePassword');
const forgotPassword = require('./forgotPassword');
const googleAuth = require('./googleAuth');
const googleRedirect = require('./googleRedirect');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  forgotPassword,
  changePassword,
};
