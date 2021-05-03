import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  bookingPlayground,
  getAllPlayerBookings,
  getPlaygroundsBookings,
  approveBooking,
} from '../controllers/BookingController.js';
const router = express.Router();

router
  .route('/')
  .post(protect, bookingPlayground)
  .get(protect, getAllPlayerBookings);
router.route('/playgroundbookings/:id').get(protect, getPlaygroundsBookings);
router.route('/approve/:id').put(protect, approveBooking);

export default router;
