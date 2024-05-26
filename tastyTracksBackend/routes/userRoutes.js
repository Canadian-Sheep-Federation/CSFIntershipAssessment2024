const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const attachUser = require("../controllers/attachUserMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/me", attachUser, userController.getMe);

router
  .route("/")
  .get(userController.getAllusers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
