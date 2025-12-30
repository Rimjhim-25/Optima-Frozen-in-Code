// backend/routes/dashboardRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', protect, (req, res) => {
  res.json({
    totalRooms: 45,
    equipmentItems: 120,
    libraryBooks: 850,
    activeBookings: 127,
    avgBookingTime: 1.8,
    conflicts: 0,
    dashboardLoadTime: 1.2,
    resourcesSupported: 4
  });
});

module.exports = router;
