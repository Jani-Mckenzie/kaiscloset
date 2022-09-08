const Items = require("../models/items");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


/**
 *
 * Get all items
 */
exports.getAllItems = catchAsync(async (req, res) => {

  const items = await Items.find();
  res.status(200).json({
    status: "Success",
    results: items.length,
    data: {
      items,
    },
  });
});
/**
 *
 * Get item by ID
 */
exports.getItemById = catchAsync(async (req, res) => {

  const item = await Items.findById(req.params.id);
  if (!item) throw new AppError('No Item found', 404)


  res.status(200).json({
    status: "success",
    data: {
      item
    },
  });

});
/**
 *
 * Creating an item
 */
exports.createItem = catchAsync(async (req, res) => {

  const item = await Items.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      item,
    },
  });

});

//Update item
exports.updateItem = catchAsync(async (req, res) => {
  const item = await Items.findOneAndUpdate({ _id: req.params.id }, req.body);

  if (!item) throw new AppError('No Item found', 404)

  res.status(200).json({
    status: 'success',
    data: {
      item,
    }
  });

});



/**
 *
 * Deleting item from list
 */
exports.deleteItem = catchAsync(async (req, res) => {
  const item = await Items.findOneAndDelete({ _id: req.params.id });

  if (!item) throw new AppError('No Item found', 404)

  res.status(204).json({
    status: 'success',
    data: {
      item: null,
    }
  });

});


