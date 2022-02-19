'use strict';

const CONSTANTS = require('./constants');
const MODELS = require('../models');
const { hashPassword } = require('./utils');
const { TEST_USER } = require("../../config");
const dbMigrations = {};

/**
 * function to migerate database based on version number.
 */
dbMigrations.migerateDatabase = async () => {
    let user;
    // get database version.
    let dbVersion = await MODELS.dbVersionModel.findOne({});

    // check if it is initial version then do this to migerate database.
    if (!dbVersion || dbVersion.version <= CONSTANTS.DATABASE_VERSIONS.ONE) {
        /** -- add dummy user  */
        let password = await hashPassword(TEST_USER.TEST_USER_PASSWORD);
        let saveData = { email: TEST_USER.TEST_USER_EMAIL, password: password, userType: CONSTANTS.USER_TYPE.ADMIN }
        user = await MODELS.userModel.findOneAndUpdate({ email: TEST_USER.TEST_USER_EMAIL }, saveData, { upsert: true, new: true });
        dbVersion = await MODELS.dbVersionModel.findOneAndUpdate({}, { version: CONSTANTS.DATABASE_VERSIONS.ONE }, { upsert: true, new: true});
    }
    if (dbVersion.version < CONSTANTS.DATABASE_VERSIONS.TWO) {
        /** -- dummy categories  */
        let dataToSave = [ ];

        Object.values(CONSTANTS.FEED_CATEGORIES).forEach(category => {
            dataToSave.push({ categoryName: category })
        })
        await MODELS.newsCategoryModel.insertMany(dataToSave);
        dbVersion = await MODELS.dbVersionModel.findOneAndUpdate({}, { version: CONSTANTS.DATABASE_VERSIONS.TWO }, { upsert: true, new: true});
    }
    if (dbVersion.version < CONSTANTS.DATABASE_VERSIONS.THREE) {
        /** -- add dummy feeds  */
        let dataToSave = [ ];
        let categories = [ CONSTANTS.FEED_CATEGORIES.UI, CONSTANTS.FEED_CATEGORIES.AI ];

        for (let category of categories) {
            let categoryDetails = await MODELS.newsCategoryModel.findOne({ categoryName: category});
            dataToSave.push({createdBy: user._id, updatedBy: user._id, categoryId: categoryDetails._id, description: 'Testing Data'})
        }
        await MODELS.userFeedModel.insertMany(dataToSave);
        dbVersion = await MODELS.dbVersionModel.findOneAndUpdate({}, { version: CONSTANTS.DATABASE_VERSIONS.THREE }, { upsert: true, new: true});
    } 
};

module.exports = dbMigrations;