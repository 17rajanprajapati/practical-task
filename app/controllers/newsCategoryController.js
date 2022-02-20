const HELPERS = require("../helpers");
const { MESSAGES } = require('../utils/constants');
const SERVICES = require('../services');
const { convertIdToMongooseId } = require('../utils/utils');

let newsCategoryController = {};

/**
 * Function to list news category.
 */
newsCategoryController.list = async (payload) => {
  try{
    let criteria = { };
    if(payload.categoryId){
      criteria['_id'] = convertIdToMongooseId(payload.categoryId);
    }
    let catgeories = await SERVICES.newsCategoryService.find(criteria);
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_FETCHED_SUCCESSFULLY), { catgeories });
  } catch(err){
    throw HELPERS.responseHelper.createErrorResponse(err.message, ERROR_TYPES.BAD_REQUEST);
  }
};

/* export newsCategoryController */
module.exports = newsCategoryController;