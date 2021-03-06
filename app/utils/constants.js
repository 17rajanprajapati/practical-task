let CONSTANTS = {};

CONSTANTS.MESSAGES = require('./messages');

CONSTANTS.AVAILABLE_AUTHS = {
    USER: "user"
};

CONSTANTS.SECURITY = {
    JWT_SIGN_KEY: "RANDOM_JWT_KEY_TO_PASTE_HERE",
    BCRYPT_SALT: 2564414
};

CONSTANTS.ERROR_TYPES = {
    DATA_NOT_FOUND: "DATA_NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    ALREADY_EXISTS: "ALREADY_EXISTS",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    UNAUTHORIZED: "UNAUTHORIZED"
};

CONSTANTS.NORMAL_PROJECTION = { createdAt: 0, updatedAt: 0, __v: 0 };

module.exports = CONSTANTS;
