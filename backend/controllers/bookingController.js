// controllers/bookingController.js
const Booking = require('../models/booking');
const Apartment = require('../models/apartment');
const User = require('../models/user');


// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { userId, apartmentId, startDate, endDate, totalPrice } = req.body;

    // Check if the apartment exists
    const apartment = await Apartment.findByPk(apartmentId);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the booking
    const booking = await Booking.create({
      userId,
      apartmentId,
      startDate,
      endDate,
      totalPrice,
      status: 'pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: ['User', 'Apartment'], // Include associated User and Apartment data
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id, {
      include: ['User', 'Apartment'],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Update a booking status
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (['pending', 'confirmed', 'canceled'].includes(status)) {
      await booking.update({ status });
      res.status(200).json({ message: 'Booking status updated successfully' });
    } else {
      res.status(400).json({ message: 'Invalid status' });
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
