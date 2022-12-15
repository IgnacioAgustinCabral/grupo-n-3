const express = require("express");
const {
  allCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isUserAuthenticated } = require("../middlewares/jwt");
const { isAdminRole } = require("../middlewares/isAdminRole");
const {
  validateRequestBySchema,
} = require("../middlewares/validateRequestSchema");
const categorySchema = require("../schemas");
const router = express.Router();

router.use(isUserAuthenticated);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/', allCategories);

/**
 * @swagger
 * /categories/:id:
 *   get:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/:id', getCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post('/', isAdminRole, validateRequestBySchema(categorySchema), postCategory)

/**
 * @swagger
 * /categories/:id:
 *   put:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.put('/:id', isAdminRole, validateRequestBySchema(categorySchema), updateCategory)

/**
 * @swagger
 * /categories/:id:
 *   delete:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.delete('/:id', isAdminRole, deleteCategory)

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post('/', isAdminRole, validateRequestBySchema(categorySchema), postCategory)

/**
 * @swagger
 * /categories/:id:
 *   put:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.put('/:id', isAdminRole, validateRequestBySchema(categorySchema), updateCategory)

/**
 * @swagger
 * /categories/:id:
 *   delete:
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: OK
 *     security:
 *       - bearerAuth: []
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.delete('/:id', isAdminRole, deleteCategory)

module.exports = router
