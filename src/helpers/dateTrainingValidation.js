const dateTrainingValidation = (value, helpers) => {
    const date = new Date();
    const dateNow = date.setHours(0, 0, 0, 0);

    if (Number(value) < Number(dateNow)) {
        throw new Error('the date cannot be earlier');
    };
    return value;
};

module.exports = dateTrainingValidation;