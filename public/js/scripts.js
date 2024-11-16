const form = document.getElementById('booking-form');
const messages = document.getElementById('messages');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        facility: document.getElementById('facility').value,
        date: document.getElementById('date').value,
        startTime: document.getElementById('startTime').value,
        duration: document.getElementById('duration').value,
    };

    try {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });
        const result = await response.json();
        messages.textContent = result.message;
    } catch (error) {
        messages.textContent = 'Error: Could not book the facility.';
    }
});
