const Admin = require("../models/admins");
// Get All admins*******************************
exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.find();
  // const admins = [];
  res.status(200).json({
    status: "Success",
    results: admins.length,
    data: {
      admins,
    },
  });
};
// *******************************************

//Get Admin By ID****************************
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { admin },
    });
  } catch (error) {
    res.send("Admin not Found");
  }
};
//*******************************

// Creat admin *******************************************
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    console.log("admin Created Successfully");
    res.send("Successfully created admin");
    // res.status(201).json({ status: "success", data: { id: admin._id } });
  } catch (err) {
    console.log(err);
    res.send("admin not created");
  }
};
// ******************************************************

//Update admin ************************************************
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("admin Created Successfully");
    res.send("Successfully Updated admin");
  } catch (err) {
    res.send("admin not updated");
  }
};

// ********************************

//Delete admin ************************************************

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOneAndDelete({ _id: req.params.id });
    res.send("Successfully deleted admin");
  } catch (err) {
    res.send("admin not deleted");
  }
};

// ********************************
