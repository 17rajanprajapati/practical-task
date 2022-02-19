const { newsCategoryModel } = require(`../models`);

let newsFeedService = {};

/** 
 * function to create news categoryy
 */
newsFeedService.create = async (payload) => {
  return await newsCategoryModel(payload).save();
};

/**
 * function to update one news Category.
 */
newsFeedService.findOneAndUpdate = async (criteria, dataToUpdate, options) => {
  return await newsCategoryModel.findOneAndUpdate(criteria, dataToUpdate, options);
};

/**
 * function to find one news category.
 */
newsFeedService.findOne = async (criteria, projection) => {
  return await newsCategoryModel.findOne(criteria, projection).lean();
};

/**
 * function to find news category.
 */
 newsFeedService.find = async (criteria, projection) => {
  return await newsCategoryModel.find(criteria, projection).lean();
};

/**
 * function to find one and delete news category.
 */
 newsFeedService.findOneAndDelete = async (criteria) => {
  return await newsCategoryModel.findOneAndDelete(criteria).lean();
};

module.exports = newsFeedService; 