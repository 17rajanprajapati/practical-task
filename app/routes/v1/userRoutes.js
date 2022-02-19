const Joi = require('joi');
const { AVAILABLE_AUTHS, GENDER, LANGUAGE, PHONE_REGEX, TIME_REGEX } = require(`../../utils/constants`);
//load controllers
const { userController } = require(`../../controllers`);

let routes = [
	{
		method: 'POST',
		path: '/v1/file/upload',
		joiSchema: {
			/** Route format to use for files upload */
			formData: {
				file: Joi.any().meta({ swaggerType: 'file' }).optional().description('Image file to upload')
			}
		},
		handler: userController.uploadFile
	},
	{
		method: 'POST',
		path: '/v1/user/',
		joiSchema: {
			body: {
				email: Joi.string().email().required().description('User\'s email.'),
				password: Joi.string().required().description('User\'s password.'),
				fullName: Joi.string().required().description('User\'s full name.'),
				gender: Joi.string().valid(...Object.values(GENDER)).required().description('User\'s gender.'),
				phoneNumber: Joi.string().regex(PHONE_REGEX).required().error(new Error('Please enter correct phone number.')).description('User\'s phone number.'),
				language: Joi.string().valid(...Object.values(LANGUAGE)).required().description('User\'s language.'),
				martialStatus: Joi.boolean().required().description('User\'s martial status.'),
				dob: Joi.date().required().description('User\'s dob.'),
				timeOfBirth: Joi.string().regex(TIME_REGEX).error(new Error('Please enter time of birth in HH:MM:SS')).required().description('User\'s time of birth.'),
				profileImage: Joi.string().allow('').optional().description('Url of profile image.')
			}
		},
		handler: userController.registerNewUser
	},
	{
		method: 'POST',
		path: '/v1/user/login',
		joiSchema: {
			body: {
				email: Joi.string().email().optional().description('User\'s email.'),
				password: Joi.string().description('User\'s password')
			}
		},
		handler: userController.login
	},
	{
		method: 'PUT',
		path: '/v1/user/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				oldPassword: Joi.string().optional().description('oldPassword'),
				newPassword: Joi.string().when('oldPassword', { is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional() }).description('New password.'),
				fullName: Joi.string().required().description('User\'s full name.'),
				gender: Joi.string().valid(...Object.values(GENDER)).required().description('User\'s gender.'),
				phoneNumber: Joi.string().regex(PHONE_REGEX).required().error(new Error('Please enter correct phone number.')).description('User\'s phone number.'),
				language: Joi.string().valid(...Object.values(LANGUAGE)).required().description('User\'s language.'),
				martialStatus: Joi.boolean().required().description('User\'s martial status.'),
				dob: Joi.date().required().description('User\'s dob.'),
				timeOfBirth: Joi.string().regex(TIME_REGEX).error(new Error('Please enter time of birth in HH:MM:SS')).required().description('User\'s time of birth.'),
				profileImage: Joi.string().allow('').optional().description('Url of profile image.')
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userController.updateProfile
	},
	{
		method: 'GET',
		path: '/v1/user/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userController.getUserProfile
	}
];

module.exports = routes;
