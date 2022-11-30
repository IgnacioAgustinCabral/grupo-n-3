const createHttpError = require('http-errors')
const {Category} = require('../database/models')
const { endpointResponse} = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { ErrorObject } = require('../helpers/error')

// example of a controller. First call the service, then build the controller method
module.exports = {
    allCategories: catchAsync(async (req, res, next) => {
      try {
        const categories = await Category.findAll()
        endpointResponse({
          res,
          message: 'Categories retrieved successfully',
          body: categories,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving categories] - [Categories - GET]: ${error.message}`,
        )
        next(httpError)
      }
    }),
    getCategory: catchAsync( async (req,res,next)=>{
        const {id} = req.params;
        try {
            const category = await Category.findByPk(id);
            if(!category){
                const httpError = createHttpError(404, 'category not found');
                return next(httpError);
            }
            endpointResponse({
                res,
                message: "Category retrieved successfully",
                body: category,
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Category] - [Category - GET]: ${error.message}`
              );
              next(httpError);
        }
    }),
    postCategory: catchAsync(async (req, res, next) => {
        const { name, description } = req.body;
        try {
          const [category, created] = await Category.findOrCreate({
            where: {
              name,
              description,
            },
          });
          endpointResponse({
            res,
            message: created
              ? "category successfully"
              : "category already exist",
            body: category,
          });
        } catch (error) {
          const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving CategoryPost] - [CategoryPost - POST]: ${error.message}`
          );
          next(httpError);
        }
      }),
  }
  
