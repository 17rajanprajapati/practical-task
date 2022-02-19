/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

/**************************************************
 ************* News Category Model or collection ***********
 **************************************************/
const newsCategorySchema = new Schema({
    categoryName: { type: String },
    isDeleted: { type: Boolean },
});

newsCategorySchema.set('timestamps', true);

module.exports = MONGOOSE.model('newsCategory', newsCategorySchema);



