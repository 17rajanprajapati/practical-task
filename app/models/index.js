/********************************
 **** Managing all the models ***
 ********* independently ********
 ********************************/
module.exports = {
    userModel: require(`./userModel`),
    dbVersionModel: require(`./dbVersionModel`),
    newsCategoryModel: require(`./newsCategoryModel`),
    userFeedModel: require(`./userFeedModel`)
};