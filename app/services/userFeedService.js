const { userFeedModel } = require(`../models`);
const utils = require(`../utils/utils`);

let userFeedService = {};

/** 
 * function to register a new  user
 */
userFeedService.registerUserFeed = async (payload) => {
  // encrypt user's password and store it in the database.
  payload.password = await utils.hashPassword(payload.password);
  return await userFeedModel(payload).save();
};

/**
 * function to update user.
 */
userFeedService.updateUserFeed = async (criteria, dataToUpdate, options) => {
  return await userFeedModel.findOneAndUpdate(criteria, dataToUpdate, options);
};

/**
 * function to fetch user from the system based on criteria.
 */
userFeedService.getUserFeed = async (criteria, projection) => {
  return await userFeedModel.findOne(criteria, projection).lean();
};

module.exports = userFeedService;