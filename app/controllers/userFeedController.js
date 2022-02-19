const HELPERS = require("../helpers");
const { MESSAGES, ERROR_TYPES } = require('../utils/constants');
const SERVICES = require('../services');

let userFeedController = {};

/**
 * function to create.
 */
userFeedController.createFeed = async (payload) => {
  let criteria = { categoryId: payload.categoryId };

  let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
  if (!isNewsCategory) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }
  let feed = await SERVICES.userFeedService.create(payload);
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_ADDED_SUCCESSFULLY), { feed });
};

/**
 * Function to update.
 */
userFeedController.updateFeeds = async (payload) => {
  let criteria = { _id: payload.categoryId };
  let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
  if (!isCategory) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }

  let isFeed = await SERVICES.userFeedService.findOne({ _id: payload.userFeedId });
  if (!isFeed) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }
  let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: payload.userFeedId }, {...payload});
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_UPDATED_SUCCESSFULLY), { feed });
};

/**
 * Function to upload file.
 */
userFeedController.listFeeds = async (payload) => {
  let criteria = { };
  if(payload.categoryId){
    criteria['_id'] = payload.userFeedId;
  }
  let feeds = await SERVICES.userFeedService.find(criteria);
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_FETCHED_SUCCESSFULLY), { feeds });
};

/**
 * function to login a user to the system.
 * @param {*} payload 
 * @returns 
 */
userFeedController.deleteFeed = async (payload) => {
  let isFeed = await SERVICES.userFeedService.findOne({ _id: payload.userFeedId });
  if (!isFeed) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }
  let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: payload.userFeedId }, {isDeleted: true});
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_DELETED_SUCCESSFULLY), { feed });
};

/* export userFeedController */
module.exports = userFeedController;