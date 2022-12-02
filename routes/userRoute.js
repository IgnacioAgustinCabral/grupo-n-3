const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/create", createUser);
router.put("/:id", updateUser);
router.put("/delete/:id", deleteUser);

module.exports = router;
