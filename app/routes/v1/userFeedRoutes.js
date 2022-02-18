const Joi = require('joi');
const { AVAILABLE_AUTHS, GENDER, LANGUAGE, PHONE_REGEX, TIME_REGEX } = require(`../../utils/constants`);
//load controllers
const {  registerNewUser, login, uploadFile, updateProfile, getUserProfile } = require(`../../controllers/userController`);

let routes = [
	{
		method: 'GET',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getFeeds
	}
];

module.exports = routes;
