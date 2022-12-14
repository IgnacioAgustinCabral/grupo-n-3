const express = require('express')
const { get } = require('../controllers/index')
const categoriesRouter = require('./categories')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.use('/categories',categoriesRouter);


module.exports = router
