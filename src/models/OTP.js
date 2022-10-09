const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');

const oneTimePasswordSchema = new Schema({
    token: {
        type: String,
        default: '',
    },
    expiresAt: {
        type: Date,
        expires: '1h',
        default: Date.now,
    }
}, { versionKey: false });

oneTimePasswordSchema.post('save', handleSchemaValidationError);

const OTP = model('OTP', oneTimePasswordSchema);

module.exports = OTP;