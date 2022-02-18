/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

/**************************************************
 ************* User Model or collection ***********
 **************************************************/
const newCategorySchema = new Schema({
    categoryName: { type: String }
});

newCategorySchema.set('timestamps', true);

module.exports = MONGOOSE.model('newsCategory', newCategorySchema);



