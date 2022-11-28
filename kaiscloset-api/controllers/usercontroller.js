const User = require("../models/users");
const catchAsync = require("../utils/catchAsync");
// Get All Users*******************************
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  // const users = [];
  res.status(200).json({
    status: "Success",
    results: users.length,
    data: {
      users,
    },
  });
};

// *******************************************

//Get User By ID****************************
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.send("User not Found");
  }
};
//*******************************

// Creat User *******************************************
exports.createUser = catchAsync(async (req, res) => {

  const user = await User.create(req.body);
  console.log("User Created Successfully");
  // res.send("Successfully created user");
  res.status(201).json({ status: "success", data: { id: user._id } });

});
// ******************************************************

//Update User ************************************************
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    console.log("User Created Successfully");
    // res.send("Successfully Updated user");
    res.status(200).json({ status: "success", data: { id: user._id } });
  } catch (err) {
    res.send("User not updated");
  }
};

// ********************************

//Delete User ************************************************

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    // res.send("Successfully deleted user");
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.send("User not deleted");
  }
};

// ********************************
