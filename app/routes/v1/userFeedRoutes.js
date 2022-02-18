const Joi = require('joi');
const { AVAILABLE_AUTHS } = require(`../../utils/constants`);
//load controllers
const {  } = require(`../../controllers/userController`);

let routes = [
	{
		method: 'POST',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('Feed\'s JWT token.')
			},
			body: {
				description: Joi.string().required().description('Feed\'s JWT token.'),
				categoryId: Joi.string().required().description('Feed\'s JWT token.'),
				imageUrl: Joi.string().required().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getFeeds
	},
	{
		method: 'PUT',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('Feed\'s JWT token.')
			},
			body: {
				description: Joi.string().optional().description('Feed\'s JWT token.'),
				categoryId: Joi.string().optional().description('Feed\'s JWT token.'),
				userFeedId: Joi.string().required().description('Feed\'s JWT token.'),
				imageUrl: Joi.string().optional().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getFeeds
	},
	{
		method: 'GET',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('Feed\'s JWT token.')
			},
			query: {
				userFeedId: Joi.string().optional().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getFeeds
	},
	{
		method: 'DELETE',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('Feed\'s JWT token.')
			},
			query: {
				userFeedId: Joi.string().required().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getFeeds
	}
];

module.exports = routes;
