const { getTrainingTime, RequestError } = require("../../helpers");
const { User } = require("../../models");

const addTraining = async (req, res) => {
    const { _id } = req.user;

    // eslint-disable-next-line camelcase
    const { date_start, date_finish } = req.body;
    console.log(date_start);
    console.log(date_finish);

    let start = 0;
    let finish = 0;

    if (Number(date_start) === 0 && Number(date_finish) === 0) {
        start = 0;
        finish = 0;
    } else {
        // eslint-disable-next-line camelcase
        if (date_start > date_finish) {
            // eslint-disable-next-line camelcase
            throw RequestError(400, `"date_start" must be less than "date_finish"`);
        }
        start = getTrainingTime(Number(date_start));
        finish = getTrainingTime(Number(date_finish));
    }

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