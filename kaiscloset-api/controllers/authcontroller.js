const User = require("../models/users");
const JWT = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

exports.login = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user) throw new Error("Couldn't find user");

    if (!(await user.isCorrectPassword(req.body.password))) throw new Error("Password is Incorrect", 400);

    const token = JWT.sign({ id: user._id }, process.env.SECRET, { expiresIn: '35m' });

    user.password = undefined;

    res.status(200).json({
        status: "success",
        data: {
            token,
            user
        }
    })
});

exports.signUp = catchAsync(async (req, res, next) => {
    const data = req.body;

    const newUser = await User.create(data);

    const token = JWT.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: '35m' });

    newUser.password = undefined;
    res.status(201).json({
        status: 'success',
        data: {
            token: token,
            user: newUser,
        },
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token || !token.startsWith('Bearer')) throw new AppError('You must be logged in to access this resource', 400);

    let encryptedString = token.split(' ')[1];
    const decoded = JWT.verify(encryptedString, process.env.SECRET, { expiresIn: '1m' });
    if (!decoded) throw new AppError('Token is missing or invalid', 400);

    const user = await User.findById(decoded.id);
    req.user = user;

    next();
});

exports.restrictTo = (allowedRoles) =>
    catchAsync(async (req, res, next) => {
        if (allowedRoles.includes(req.user.role)) return next();
        else throw new AppError('You do not have access to this url', 400);
    });
