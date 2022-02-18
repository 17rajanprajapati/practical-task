/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

const { GENDER, LANGUAGE } = require('../utils/constants');
/**************************************************
 ************* User Model or collection ***********
 **************************************************/
const userFeedSchema = new Schema({
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'newsCategory' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    imageUrl: { type: String },
});

userFeedSchema.set('timestamps', true);

module.exports = MONGOOSE.model('userFeed', userFeedSchema);



