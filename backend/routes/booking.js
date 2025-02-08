const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/', bookingController.createBooking); // Create a booking
router.get('/', bookingController.getAllBookings); // Get all bookings
router.get('/:id', bookingController.getBookingById); // Get booking by ID
router.put('/:id', bookingController.updateBookingStatus); // Update booking status
router.delete('/:id', bookingController.deleteBooking); // Delete a booking

module.exports = router;
