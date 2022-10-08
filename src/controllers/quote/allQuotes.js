const { Quote } = require("../../models");

const allQuotes = async (_, res) => {
    const quotes = await Quote.find({}, '-createdAt -updatedAt');
    res.json({ quotes });
};

module.exports = allQuotes;