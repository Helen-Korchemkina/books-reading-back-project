const RequestError = require('./RequestError');

const idComparison = (id1, id2) => {
  if (id1.toString() !== id2.toString())
    throw RequestError(401, 'No rights, please login');
};

module.exports = idComparison;
