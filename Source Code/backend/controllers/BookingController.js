import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';

// --Description: get all playgrounds
// --Route: GET /api/playgrounds
// --Access: Public
const getAllPlayerBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ playerId: req.user._id })
    .sort({ createdAt: 'desc' })
    .exec();
  res.json(bookings);
});

// --Description: Create a Playground
// --Route: POST /api/playground
// --Access: Private
const bookingPlayground = asyncHandler(async (req, res) => {
  const {
    date,
    startTime,
    endTime,
    phoneNumber,
    ownerId,
    name,
    playgroundId,
  } = req.body;
  const booking = new Booking({
    name: name,
    ownerId: ownerId,
    playerId: req.user._id,
    date: date,
    startTime: startTime,
    endTime: endTime,
    phoneNumber: phoneNumber,
    playgroundId: playgroundId,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// --Description: Get logged in user playgrounds
// --Route: GET /api/playground/myplaygrounds
// --Access: Private
const getPlaygroundsBookings = asyncHandler(async (req, res) => {
  const playgroundBookings = await Booking.find({
    ownerId: req.user._id,
    playgroundId: req.params.id,
  });

  res.json(playgroundBookings);
});

// --Description: Approve playground
// --Route: POST /api/playground/approve
// --Access: Private/Admin
const approveBooking = asyncHandler(async (req, res) => {
  const { approved } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.approved = approved;

    const updatedBooking = await booking.save();
    res.status(201).json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

export {
  approveBooking,
  getAllPlayerBookings,
  getPlaygroundsBookings,
  bookingPlayground,
};
