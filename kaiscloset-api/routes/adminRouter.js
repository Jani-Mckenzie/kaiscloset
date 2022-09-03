const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

//Declare Routes For admins CRUD *********************************
const { getAllAdmins, createAdmin } = require("../controllers/admincontroller");
//************************************************************** */

router.route("/").get(getAllAdmins).post(createAdmin);

router
  .route("/:id")
  .get(adminController.getAdminById)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
