const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admins = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  },
  {
    collection: "admins",
  }
);
module.exports = mongoose.model("Admins", admins);
