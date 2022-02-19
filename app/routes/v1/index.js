
/********************************
 ********* All routes ***********
 ********************************/
let v1Routes = [
    ...require('./userRoutes'),
    ...require('./userFeedRoutes'),
    ...require('./newsCategoryRoutes'),
]
module.exports = v1Routes;
