const { newsCategoryModel } = require(`../models`);

let newsFeedService = {};

/** 
 * function to register a new  user
 */
newsFeedService.create = async (payload) => {
  return await newsCategoryModel(payload).save();
};

/**
 * function to update user.
 */
newsFeedService.findOneAndUpdate = async (criteria, dataToUpdate, options) => {
  return await newsCategoryModel.findOneAndUpdate(criteria, dataToUpdate, options);
};

/**
 * function to fetch user from the system based on criteria.
 */
newsFeedService.findOne = async (criteria, projection) => {
  return await newsCategoryModel.findOne(criteria, projection).lean();
};

/**
 * function to fetch user from the system based on criteria.
 */
 newsFeedService.find = async (criteria, projection) => {
  return await newsCategoryModel.find(criteria, projection).lean();
};

/**
 * function to fetch user from the system based on criteria.
 */
 newsFeedService.findOneAndDelete = async (criteria) => {
  return await newsCategoryModel.findOneAndDelete(criteria).lean();
};

module.exports = newsFeedService; 