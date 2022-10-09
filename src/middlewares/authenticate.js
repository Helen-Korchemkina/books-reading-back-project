const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { User, Session, OTP } = require('../models');
const { SECRET_KEY } = process.env;

const notAuthorization = RequestError(401, 'Not authorized');

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') { next(notAuthorization) };

  const blackList = await Session.findOne({ token });
  const changeToken = await OTP.findOne({ token });
  if (blackList || changeToken) { next(notAuthorization) };

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user ) { next(notAuthorization) };

    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  };
};

module.exports = authenticate;
