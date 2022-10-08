const { Quote } = require("../../models");

const randomQuote = async (_, res) => {
    const quotes = await Quote.find({}, '-createdAt -updatedAt');
    const random = quotes[(Math.floor(Math.random() * (quotes.length)))];
    res.json({ random });
};

module.exports = randomQuote;