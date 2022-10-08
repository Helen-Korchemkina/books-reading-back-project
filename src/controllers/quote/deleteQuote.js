const { RequestError } = require("../../helpers");
const { Quote } = require("../../models");

const deleteQuote = async (req, res) => {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndRemove(id);
    if (!deletedQuote) { throw RequestError(404, 'Not found') };

    res.json({ message: 'Quote deleted' });
};

module.exports = deleteQuote;