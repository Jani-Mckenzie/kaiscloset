const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const authController = require("../controllers/authcontroller")

//Declare Routes For USERS CRUD *********************************
const { getAllUsers, createUser } = require("../controllers/usercontroller");
//************************************************************** */

router.route("/").get(getAllUsers).post(createUser);

router.route("/login").post(authController.login);


router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
