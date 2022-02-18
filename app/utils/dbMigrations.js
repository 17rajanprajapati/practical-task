'use strict';

const CONSTANTS = require('./constants');
const MODELS = require('../models');
const { hashPassword } = require('./utils');
const { SUPER_ADMIN } = require("../../config");
const dbMigrations = {};

/**
 * function to migerate database based on version number.
 */
dbMigrations.migerateDatabase = async () => {

    // get database version.
    let dbVersion = await MODELS.dbVersionModel.findOne({});

    // check if it is initial version then do this to migerate database.
    if (!dbVersion || dbVersion.version <= CONSTANTS.DATABASE_VERSIONS.ONE) {
        /** -- add first admin  */
        let password = await hashPassword(SUPER_ADMIN.SUPER_ADMIN_PASSWORD);
        let saveData = { email: SUPER_ADMIN.SUPER_ADMIN_EMAIL, password: password, userType: CONSTANTS.USER_TYPE.ADMIN }
        await MODELS.userModel.findOneAndUpdate({ email: SUPER_ADMIN.EMAIL }, saveData, { upsert: true });
        dbVersion = await MODELS.dbVersionModel.findOneAndUpdate({}, { version: CONSTANTS.DATABASE_VERSIONS.ONE }, { upsert: true, new: true});
    }
};

module.exports = dbMigrations;