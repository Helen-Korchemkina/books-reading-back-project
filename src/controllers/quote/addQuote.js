const { Quote } = require("../../models");

const addQuote = async (req, res) => {
    const newQuote = await Quote.create(req.body);
    res.status(201).json({ newQuote });
};

module.exports = addQuote;