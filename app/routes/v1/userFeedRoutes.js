const Joi = require('joi');
const { AVAILABLE_AUTHS } = require(`../../utils/constants`);
//load controllers
const { userFeedController } = require(`../../controllers`);

let routes = [
	{
		method: 'POST',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				description: Joi.string().required().description('Feed\'s JWT token.'),
				categoryId: Joi.string().required().description('Feed\'s JWT token.'),
				imageUrl: Joi.string().optional().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userFeedController.createFeed
	},
	{
		method: 'PUT',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				description: Joi.string().optional().description('Feed\'s JWT token.'),
				categoryId: Joi.string().optional().description('Feed\'s JWT token.'),
				userFeedId: Joi.string().required().description('Feed\'s JWT token.'),
				imageUrl: Joi.string().optional().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userFeedController.updateFeeds
	},
	{
		method: 'GET',
		path: '/v1/feeds',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			query: {
				userFeedId: Joi.string().optional().description('Feed\'s Id.'),
				sort: Joi.number().valid(1, -1).optional().description('Feed\'s Id.'),
				// technologyIds: Joi.array.items(Joi.string()).optional().description('Feed\'s Id.'),
				// authorIds: Joi.array.items(Joi.string()).optional().description('Feed\'s Id.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userFeedController.listFeeds
	},
	{
		method: 'DELETE',
		path: '/v1/feeds/',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			query: {
				userFeedId: Joi.string().required().description('Feed\'s JWT token.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: userFeedController.deleteFeed
	}
];

module.exports = routes;
