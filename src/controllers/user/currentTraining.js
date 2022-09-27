const currentTraining = async (req, res) => {
    const { training } = req.user;
    res.json({ training });
};

module.exports = currentTraining;