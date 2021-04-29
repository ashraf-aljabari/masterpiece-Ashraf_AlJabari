import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// --Description: Authenticate user & get token.
// --Route: POST /api/users/login.
// --Access: public
const authUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber: phoneNumber });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      isOwner: user.isOwner,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid phone number or password');
  }
});

// --Description: Get All users.
// --Route: GET /api/users
// --Access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// --Description: Delete users.
// --Route: DELETE /api/users/:id
// --Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User Removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// --Description: Get single user by ID.
// --Route: GET /api/users/:id
// --Access: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// --Description: update single user.
// --Route: POST /api/users/:id
// --Access: Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (user.isAdmin !== req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// --Description: Register a new user
// --Route: POST /api/users
// --Access: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password, isOwner, profileImage } = req.body;

  const userExists = await User.findOne({ phoneNumber: phoneNumber });

  if (userExists) {
    res.status(400);
    throw new Error('Phone number is already in use');
  }

  const user = await User.create({
    name,
    phoneNumber,
    password,
    isOwner,
    profileImage,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      isOwner: user.isOwner,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid input');
  }
});

// --Description: Get user profile data
// --Route: POST /api/users/profile
// --Access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

// --Description: Update user profile data
// --Route: POST /api/users/profile
// --Access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
