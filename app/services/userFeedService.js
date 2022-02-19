const { userFeedModel } = require(`../models`);
const utils = require(`../utils/utils`);

let userFeedService = {};

/** 
 * function to register a new  user
 */
userFeedService.create = async (payload) => {
  return await userFeedModel(payload).save();
};

/**
 * function to update user.
 */
userFeedService.findOneAndUpdate = async (criteria, dataToUpdate, options) => {
  return await userFeedModel.findOneAndUpdate(criteria, dataToUpdate, options);
};

/**
 * function to fetch user from the system based on criteria.
 */
userFeedService.findOne = async (criteria, projection) => {
  return await userFeedModel.findOne(criteria, projection).lean();
};

userFeedService.find = async (criteria, projection) => {
  return await userFeedModel.find(criteria, projection).lean();
};


userFeedService.aggregate = async (query) => {
  return await userFeedModel.aggregate(query);
};

module.exports = userFeedService;