const currentUser = async (req, res, next) => {
    try {
        const { _id, name, email, startTraining, finishTraining, createdAt } = req.user;
        const user = { _id, name, email, startTraining, finishTraining, createdAt };

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

module.exports = currentUser;