const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');

const sessionSchema = new Schema({
    token: {
        type: String,
        default: '',
    },
    expiresAt: {
        type: Date,
        expires: '2h',
        default: Date.now,
    }
}, { versionKey: false });

sessionSchema.post('save', handleSchemaValidationError);

const Session = model('session', sessionSchema);

module.exports = Session;