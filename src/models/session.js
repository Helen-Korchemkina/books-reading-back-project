const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');

const twoHours = (60 * 60) * 2;

const sessionSchema = new Schema({
    expireAt: {
        type: Date,
        default: new Date,
        expired: twoHours,
    },
    token: {
        type: String,
        default: '',
    },
}, { versionKey: false, timestamps: true });

sessionSchema.index(
    { createdAt: 1 },
    {expireAfterSeconds: twoHours}
);

sessionSchema.post('save', handleSchemaValidationError);

const Session = model('session', sessionSchema);

module.exports = Session;