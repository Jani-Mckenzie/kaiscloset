const JWT = require("jsonwebtoken");
const User = require("../models/users");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user) throw new Error("Couldn't find user");
    if (!(await user.isCorrectPassword(req.body.password))) throw new Error("Password is Incorrect");

    const token = JWT.sign({ id: user._id }, process.env.SECRET);

    user.password = undefined;

    res.status(200).json({
        status: "success",
        data: {
            token,
            user
        }
    })
});
