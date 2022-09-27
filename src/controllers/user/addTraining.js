const { getTrainingTime } = require("../../helpers");
const { User } = require("../../models/user");

const addTraining = async (req, res) => {
    const { _id } = req.user;
    // eslint-disable-next-line camelcase
    const { date_start, date_finish } = req.body;
    const start = getTrainingTime(Number(date_start));
    const finish = getTrainingTime(Number(date_finish));

    const training = {
        start,
        startMillisecond: date_start,
        finish,
        finishMillisecond: date_finish,
    };

    await User.findByIdAndUpdate(_id, { training });

    res.json({
        training
    });
};

module.exports = addTraining;