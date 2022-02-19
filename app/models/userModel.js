/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

const { GENDER, LANGUAGE, USER_TYPE } = require('../utils/constants');
/**************************************************
 ************* User Model or collection ***********
 **************************************************/
const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    gender: { type: String, enum: [...Object.values(GENDER)] },
    phoneNumber: { type: String },
    language: { type: String, enum: [...Object.values(LANGUAGE)] },
    martialStatus: { type: Boolean, default: false },
    dob: { type: Date },
    timeOfBirth: { type: String },
    profileImageUrl: { type: String },
});

userSchema.set('timestamps', true);

module.exports = MONGOOSE.model('user', userSchema);



