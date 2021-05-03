import asyncHandler from 'express-async-handler';
import Playground from '../models/PlaygroundModel.js';

// --Description: get all playgrounds
// --Route: GET /api/playgrounds
// --Access: Public
const getAllPlaygrounds = asyncHandler(async (req, res) => {
  const playgrounds = await Playground.find({})
    .sort({ createdAt: 'desc' })
    .exec();
  res.json(playgrounds);
});

// --Description: Create a Playground
// --Route: POST /api/playground
// --Access: Private
const createPlayground = asyncHandler(async (req, res) => {
  const { name, capacity, playgroundImage, location } = req.body;
  const playground = new Playground({
    name: name,
    ownerId: req.user._id,
    capacity: capacity,
    playgroundImage: playgroundImage,
    location: location,
  });

  const createdPlayground = await playground.save();
  res.status(201).json(createdPlayground);
});

// --Description: Get logged in user playgrounds
// --Route: GET /api/playground/myplaygrounds
// --Access: Private
const getAllMyPlaygrounds = asyncHandler(async (req, res) => {
  const playgrounds = await Playground.find({ ownerId: req.user.id });

  res.json(playgrounds);
});

// --Description: Approve playground
// --Route: POST /api/playground/approve
// --Access: Private/Admin
const approvePlayground = asyncHandler(async (req, res) => {
  const { approved } = req.body;

  const playground = await Playground.findById(req.params.id);

  if (playground) {
    playground.approved = approved;

    const updatedPlayground = await playground.save();
    res.status(201).json(updatedPlayground);
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

export {
  createPlayground,
  getAllMyPlaygrounds,
  approvePlayground,
  getAllPlaygrounds,
};
