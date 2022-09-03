const Items = require("../models/items");

/**
 *
 * Get all items
 */
exports.getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json({
      status: "Success",
      results: items.length,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

/**
 *
 * Creating an item
 */
exports.createItem = async (req, res) => {
  try {
    const item = await Items.create(req.body);
    console.log("Item Created Successfully");
    res.send("Successfully created Items");
  } catch (err) {
    console.log(err);
    res.send("Item not created");
  }
};

/**
 *
 * Deleting items from list
 */
exports.deleteItem = async (req, res) => {
  try {
    const item = await Items.findOneAndDelete({ _id: req.params.id });
    res.send("Successfully Deleted Item");
  } catch (error) {
    res.send("Item not Deleted");
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { item },
    });
  } catch (error) {
    res.send("Item not Found");
  }
};

//Edit Category
exports.updateItem = async (req, res) => {
  //
  try {
    const item = await Items.findOneAndUpdate({ _id: req.params.id }, req.body);

    res.send("Successfully Updated Item");
  } catch (error) {
    res.send("Item not Updated");
  }
};
