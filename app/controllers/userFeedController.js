const HELPERS = require("../helpers");
const { MESSAGES, ERROR_TYPES } = require('../utils/constants');
const SERVICES = require('../services');
const { getPaginationConditionForAggregate, convertIdToMongooseId } = require('../utils/utils');

let userFeedController = {};

/**
 * function to create user feed.
 */
userFeedController.createFeed = async (payload) => {
  try{
    let criteria = { _id: convertIdToMongooseId(payload.categoryId) };
    
    let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
    // check category exist or not
    if (!isCategory) {
      throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
    }
    payload.categoryId = convertIdToMongooseId(payload.categoryId);
    let feed = await SERVICES.userFeedService.create({...payload, createdBy: payload.user._id, updatedBy: payload.user._id});
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_ADDED_SUCCESSFULLY), { feed });
  } catch(err){
    throw HELPERS.responseHelper.createErrorResponse(err.message, ERROR_TYPES.BAD_REQUEST);
  }
};

/**
 * Function to update user feeds.
 */
userFeedController.updateFeeds = async (payload) => {
  try{
    let isFeed = await SERVICES.userFeedService.findOne({ _id: convertIdToMongooseId(payload.userFeedId), createdBy: payload.user._id });
    // check user feed exist or not
    if (!isFeed) {
      throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
    }
  
    if (payload.categoryId){
      let criteria = { _id: convertIdToMongooseId(payload.categoryId) };
      let isCategory = await SERVICES.newsCategoryService.findOne(criteria);
      // check category exits or not
      if (!isCategory) {
        throw HELPERS.responseHelper.createErrorResponse(MESSAGES.CATEGORY_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
      }
    }
  
    let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: convertIdToMongooseId(payload.userFeedId) }, {...payload}, { new: true });
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_UPDATED_SUCCESSFULLY), { feed });
  } catch(err){
    throw HELPERS.responseHelper.createErrorResponse(err.message, ERROR_TYPES.BAD_REQUEST);
  }
};

/**
 * Function to upload file.
 */
userFeedController.listFeeds = async (payload) => {
  try{
    let matchQuery = { isDeleted: {$ne: true } };
    
    if(payload.userFeedId){
      matchQuery['_id'] = convertIdToMongooseId(payload.userFeedId);
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
  } catch(err){
    throw HELPERS.responseHelper.createErrorResponse(err.message, ERROR_TYPES.BAD_REQUEST);
  }
};

/**
 * function to login a user to the system.
 * @param {*} payload 
 * @returns 
 */
userFeedController.deleteFeed = async (payload) => {
  try{

    let isFeed = await SERVICES.userFeedService.findOne({ _id: convertIdToMongooseId(payload.userFeedId), createdBy: payload.user._id });
    // check user feed exist or not
    if (!isFeed) {
      throw HELPERS.responseHelper.createErrorResponse(MESSAGES.FEED_NOT_FOUND, ERROR_TYPES.BAD_REQUEST);
    }
    let feed = await SERVICES.userFeedService.findOneAndUpdate({ _id: convertIdToMongooseId(payload.userFeedId) }, {isDeleted: true});
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.FEED_DELETED_SUCCESSFULLY), { feed });
  } catch(err){
    throw HELPERS.responseHelper.createErrorResponse(err.message, ERROR_TYPES.BAD_REQUEST);
  }
};

/* export userFeedController */
module.exports = userFeedController;