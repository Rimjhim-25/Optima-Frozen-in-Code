// backend/routes/eventRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Event = require('../module/events');


const router = express.Router();

// GET /api/events
router.get('/', protect, async (req, res) => {
  try {
    const events = await Event.find().lean();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// POST /api/events
router.post('/', protect, async (req, res) => {
  try {
    const { title, start, end, resourceType } = req.body;
    const event = await Event.create({
      title,
      start,
      end,
      resourceType,
      createdBy: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

module.exports = router;
