const Joi = require('joi');
const { AVAILABLE_AUTHS } = require(`../../utils/constants`);
//load controllers
const { newsCategoryController } = require(`../../controllers`);

let routes = [
	{
		method: 'GET',
		path: '/v1/newsCategories',
		joiSchema: {
			headers: {
				'authorization': Joi.string().required().description('User\'s JWT token.')
			},
			query: {
				categoryId: Joi.string().optional().description('news category\'s id.'),
			}
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: newsCategoryController.list
	},
];

module.exports = routes;