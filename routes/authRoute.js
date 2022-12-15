const express = require("express");
const {
  validateRequestBySchema,
} = require("../middlewares/validateRequestSchema");
const { postLogin } = require("../controllers/authController");
const { loginSchema } = require("../schemas/auhtSchema");

const router = express.Router();

router.post("/login", validateRequestBySchema(loginSchema), postLogin);

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: correo@correo.com
 *         password: pass123
 *
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login an user account
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *      200:
 *        description: Authentication succesfully
 *      401:
 *        description: Authentication error.
 *
 */
module.exports = router;
