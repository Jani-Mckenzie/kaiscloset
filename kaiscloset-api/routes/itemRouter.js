const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemcontroller");
const authController = require("../controllers/authcontroller");

router.route("/").get(itemController.getAllItems)

router
  .route("/:id")
  .get(itemController.getItemById)

router.use(authController.protect, authController.restrictTo(['admin']))
router.route("/").post(itemController.createItem);
router
  .route("/:id")
  .delete(itemController.deleteItem)
  .patch(itemController.updateItem);

module.exports = router;
