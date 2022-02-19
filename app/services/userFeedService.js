const { userFeedModel } = require(`../models`);

let userFeedService = {};

/** 
 * function to create userFeed
 */
userFeedService.create = async (payload) => {
  return await userFeedModel(payload).save();
};

/**
 * function to update one userFeed.
 */
userFeedService.findOneAndUpdate = async (criteria, dataToUpdate, options) => {
  return await userFeedModel.findOneAndUpdate(criteria, dataToUpdate, options);
};

/**
 * function to find one userFeed.
 */
userFeedService.findOne = async (criteria, projection) => {
  return await userFeedModel.findOne(criteria, projection).lean();
};

/**
 * function to find userFeed.
 */
userFeedService.find = async (criteria, projection) => {
  return await userFeedModel.find(criteria, projection).lean();
};

/**
 * function to apply aggregate on userFeed Model.
 */
userFeedService.aggregate = async (query) => {
  return await userFeedModel.aggregate(query);
};

module.exports = userFeedService;