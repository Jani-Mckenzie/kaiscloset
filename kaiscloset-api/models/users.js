const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a name"],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Must provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      required: [true, "Must be User or Admin"],
    },
  },

  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method("isCorrectPassword", async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
