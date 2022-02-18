const HELPERS = require("../helpers");
const { MESSAGES, ERROR_TYPES, NORMAL_PROJECTION } = require('../utils/constants');
const SERVICES = require('../services');

let newsCategoryController = {};

/**
 * function to create.
 */
newsCategoryController.create = async (payload) => {
  let criteria = { categoryName: payload.categoryName };

  let isNewsCategory = await SERVICES.newsCategoryService.findOne(criteria);
  if (!isNewsCategory) {
    let category = await SERVICES.newsCategoryService.create(payload);
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_ADDED_SUCCESSFULLY), { category });
  }
  throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_ALREADY_EXISTS, ERROR_TYPES.BAD_REQUEST);
};

/**
 * Function to update.
 */
newsCategoryController.update = async (payload) => {
  let criteria = { _id: payload.categoryId };
  let catgeory = await SERVICES.newsCategoryService.findOne(criteria);
  if (catgeory) {
    catgeory = await SERVICES.newsCategoryService.findOneAndUpdate(criteria, { categoryName: payload.categoryName }, {new: true});
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_UPDATED_SUCCESSFULLY), { catgeory });
  }
  throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
};

/**
 * Function to upload file.
 */
newsCategoryController.list = async (payload) => {
  let criteria = { };
  if(payload.categoryId){
    criteria['_id'] = payload.categoryId;
  }
  let catgeories = await SERVICES.newsCategoryService.find(criteria);
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_FETCHED_SUCCESSFULLY), { catgeories });
};

/**
 * function to login a user to the system.
 * @param {*} payload 
 * @returns 
 */
newsCategoryController.delete = async (payload) => {
  let criteria = { _id: payload.categoryId };
  let catgeory = await SERVICES.newsCategoryService.findOne(criteria);
  if (catgeory) {
    await SERVICES.newsCategoryService.findOneAndUpdate(criteria, { isDeleted: true });
    return HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_DELETED_SUCCESSFULLY);
  }
  throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.DATA_NOT_FOUND);
};

/* export newsCategoryController */
module.exports = newsCategoryController;