let CONSTANTS = {};

CONSTANTS.MESSAGES = require('./messages');

CONSTANTS.AVAILABLE_AUTHS = {
    USER: "user",
};

CONSTANTS.USER_TYPE = {
    USER: 1,
};

CONSTANTS.PHONE_REGEX=/^\+\d{1,3}\d{8,10}$/;
CONSTANTS.TIME_REGEX=/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;

CONSTANTS.SECURITY = {
    JWT_SIGN_KEY: "RANDOM_JWT_KEY_TO_PASTE_HERE",
    BCRYPT_SALT: 2564414
};

CONSTANTS.GENDER = {
    MALE: "Male",
    FEMALE: "Female"
};

CONSTANTS.FEED_CATEGORIES = {
    TECH: "TECH",
    UI: "UI",
    DESIGN: "DESIGN",
    MARKETING: "MARKETING",
    AI: "AI",
    TESTING: "TESTING",
};

CONSTANTS.DATABASE_VERSIONS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
};

CONSTANTS.LANGUAGE = {
    HINDI: "Hindi",
    ENGLISH: "English"
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
