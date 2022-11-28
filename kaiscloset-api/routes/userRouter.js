const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const authController = require("../controllers/authcontroller")

//Declare Routes For USERS CRUD *********************************


router.route("/login").post(authController.login);

router.route("/signUp").post(authController.signUp);

router.use(authController.protect)
router.route("/").get(authController.restrictTo(['admin']), userController.getAllUsers).post(authController.restrictTo(['admin']), userController.createUser);
router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
//************************************************************** */
module.exports = router;
