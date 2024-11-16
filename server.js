const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Booking = require('./models/Booking');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/smartCampus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/api/book', async (req, res) => {
    const { name, role, facility, date, startTime, duration } = req.body;

    try {
        if (facility === 'classroom' && role !== 'faculty') {
            return res.json({ message: 'Only faculties can book classrooms.' });
        }

        if (facility === 'badminton' && duration > 2) {
            return res.json({ message: 'Badminton courts can be booked for a maximum of 2 hours.' });
        }

        const overlappingBooking = await Booking.findOne({
            facility,
            date,
            startTime,
        });

        if (overlappingBooking) {
            return res.json({ message: 'This slot is already booked.' });
        }

        const booking = new Booking({ name, role, facility, date, startTime, duration });
        await booking.save();

        res.json({ message: 'Booking successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
