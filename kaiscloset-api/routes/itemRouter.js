const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemcontroller");
const { getAllItems, createItem } = require("../controllers/itemcontroller");

router.route("/").get(getAllItems).post(createItem);

router
  .route("/:id")
  .get(itemController.getItemById)
  .delete(itemController.deleteItem)
  .patch(itemController.updateItem);

module.exports = router;
