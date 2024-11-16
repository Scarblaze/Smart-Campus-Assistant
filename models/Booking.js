const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: String,
    role: String,
    facility: String,
    date: String,
    startTime: String,
    duration: Number,
});

module.exports = mongoose.model('Booking', BookingSchema);
