const mongoose = require("mongoose");

const items = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    url: {
      type: String,
    },
  },
  { collection: "items" }
);

const Items = mongoose.model("Items", items);
module.exports = Items;
