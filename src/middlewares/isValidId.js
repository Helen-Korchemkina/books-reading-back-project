const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const correctId = isValidObjectId(contactId);

    if (!correctId) {
        const error = RequestError(400, `${contactId} is not correct id format`);
        next(error);
    };

    next();

};

module.exports = isValidId;