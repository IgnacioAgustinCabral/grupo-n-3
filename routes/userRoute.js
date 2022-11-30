const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/create", createUser);

module.exports = router;
