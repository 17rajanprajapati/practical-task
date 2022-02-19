/********************************
 **** Managing all the controllers ***
 ********* independently ********
 ********************************/
module.exports = {
    userController: require(`./userController`),
    userFeedController: require(`./userFeedController`),
    newsCategoryController: require(`./newsCategoryController`),
};