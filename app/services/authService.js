const { MESSAGES, ERROR_TYPES, AVAILABLE_AUTHS, USER_TYPE } = require('../utils/constants');
const HELPERS = require("../helpers");
const { userModel } = require(`../models`);
const { decryptJwt } = require('../utils/utils');

let authService = {};

/**
 * function to authenticate user.
 */
authService.userValidate = (auth) => {
    return (request, response, next) => {
        validateUser(request, auth).then((result) => {
            if (result.isAuthorized) {
                return next();
            }
            let responseObject = HELPERS.responseHelper.createErrorResponse(result.msg || MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        }).catch((err) => {
            let responseObject = HELPERS.responseHelper.createErrorResponse(MESSAGES.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
            return response.status(responseObject.statusCode).json(responseObject);
        });
    };
};


/**
 * function to validate user's jwt token and fetch its details from the system. 
 * @param {} request 
 */
let validateUser = async (request, auth) => {
    try {
        let decodedToken;
        try {
            decodedToken = decryptJwt(request.headers.authorization)
        } catch (err) {
            return { isAuthorized: false, msg: MESSAGES.SESSION_EXPIRED }
        }
        let user = await userModel.findOne({ _id: decodedToken.id }).lean();
        if (user) {
            if (auth === AVAILABLE_AUTHS.USER && user.userType != USER_TYPE.USER) {
                return { isAuthorized: false }
            } else if (auth === AVAILABLE_AUTHS.ADMIN && user.userType != USER_TYPE.ADMIN) {
                return { isAuthorized: false }
            }
            request.user = user;
            return { isAuthorized: true };
        }
        return { isAuthorized: false };
    } catch (err) {
        return { isAuthorized: false };
    }
};

module.exports = authService;