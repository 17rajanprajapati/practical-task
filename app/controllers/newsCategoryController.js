const HELPERS = require("../helpers");
const { MESSAGES } = require('../utils/constants');
const SERVICES = require('../services');

let newsCategoryController = {};

/**
 * Function to list news category.
 */
newsCategoryController.list = async (payload) => {
  let criteria = { };
  if(payload.categoryId){
    criteria['_id'] = payload.categoryId;
  }
  let catgeories = await SERVICES.newsCategoryService.find(criteria);
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_FETCHED_SUCCESSFULLY), { catgeories });
};

/* export newsCategoryController */
module.exports = newsCategoryController;