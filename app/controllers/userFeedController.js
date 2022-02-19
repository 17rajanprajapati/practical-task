const HELPERS = require("../helpers");
const { MESSAGES, ERROR_TYPES } = require('../utils/constants');
const SERVICES = require('../services');
const { getPaginationConditionForAggregate } = require('../utils/utils');

let userFeedController = {};

/**
 * function to create user feed.
 */
userFeedController.createFeed = async (payload) => {
  let criteria = { _id: payload.categoryId };

  let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
  // check category exist or not
  if (!isCategory) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }
  let feed = await SERVICES.userFeedService.create({...payload, createdBy: payload.user._id, updatedBy: payload.user._id});
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_ADDED_SUCCESSFULLY), { feed });
};

/**
 * Function to update user feeds.
 */
userFeedController.updateFeeds = async (payload) => {
  let isFeed = await SERVICES.userFeedService.findOne({ _id: payload.userFeedId, createdBy: payload.user._id });
  // check user feed exist or not
  if (!isFeed) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }

  if (payload.categoryId){
    let criteria = { _id: payload.categoryId };
    let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
    // check category exits or not
    if (!isCategory) {
      throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
    }
  }

  let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: payload.userFeedId }, {...payload}, { new: true });
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_UPDATED_SUCCESSFULLY), { feed });
};

/**
 * Function to upload file.
 */
userFeedController.listFeeds = async (payload) => {
  let matchQuery = { isDeleted: {$ne: true } };
  
  if(payload.userFeedId){
    matchQuery['_id'] = payload.userFeedId;
  }

  if (payload.technology) {
    matchQuery["categoryId"] = { "$in": payload.technology };
  }

  if (payload.author) {
    matchQuery["createdBy"] = { "$in": payload.author };
  }

  let sort = {};
  sort["createdAt"] = -1 || payload.sort;

  let feeds = await SERVICES.userFeedService.aggregate([
    {$match: matchQuery},
    {$sort: sort},
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user"
      }
    },
    {$unwind: "$user"},
    {$project: { "user.password": 0, "user.__v": 0, "user.createdAt": 0, "user.updatedAt": 0 }}
  ]);
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CATEGORY_FETCHED_SUCCESSFULLY), { feeds });
};

/**
 * function to login a user to the system.
 * @param {*} payload 
 * @returns 
 */
userFeedController.deleteFeed = async (payload) => {
  let isFeed = await SERVICES.userFeedService.findOne({ _id: payload.userFeedId, createdBy: payload.user._id });
  // check user feed exist or not
  if (!isFeed) {
    throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
  }
  let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: payload.userFeedId }, {isDeleted: true});
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_DELETED_SUCCESSFULLY), { feed });
};

/* export userFeedController */
module.exports = userFeedController;