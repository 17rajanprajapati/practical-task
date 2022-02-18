const Joi = require('joi');
const { AVAILABLE_AUTHS } = require(`../../utils/constants`);
//load controllers
const { newsCategoryController } = require(`../../controllers`);

let routes = [
	{
		method: 'POST',
		path: '/v1/newsCategory',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				categoryName: Joi.string().lowercase().required().description('news category\'s name.'),
			}
		},
		auth: AVAILABLE_AUTHS.ADMIN,
		handler: newsCategoryController.create
	},
	{
		method: 'PUT',
		path: '/v1/newsCategory',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				categoryName: Joi.string().required().description('news category\'s name.'),
				categoryId: Joi.string().required().description('news category\'s id.'),
			}
		},
		auth: AVAILABLE_AUTHS.ADMIN,
		handler: newsCategoryController.update
	},
	{
		method: 'GET',
		path: '/v1/newsCategories',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				categoryId: Joi.string().optional().description('news category\'s id.'),
			}
		},
		auth: AVAILABLE_AUTHS.ADMIN,
		handler: newsCategoryController.list
	},
	{
		method: 'DELETE',
		path: '/v1/newsCategory',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			body: {
				categoryId: Joi.string().required().description('news category\'s id.'),
			}
		},
		auth: AVAILABLE_AUTHS.ADMIN,
		handler: newsCategoryController.delete
	},
];

module.exports = routes;
