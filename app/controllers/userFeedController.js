const HELPERS = require("../helpers");
const { MESSAGES, ERROR_TYPES } = require('../utils/constants');
const SERVICES = require('../services');

let userFeedController = {};

/**
 * function to register a user to the system.
 */
 userFeedController.getFeeds = async (payload) => {
  let feeds = await SERVICES.userFeedService.getUserFeeds();
  return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.USER_REGISTERED_SUCCESSFULLY), { feeds });
};

/* export userController */
module.exports = userFeedController;