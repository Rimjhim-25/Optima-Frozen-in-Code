// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date },
    resourceType: {
      type: String,
      enum: ['room', 'equipment', 'book'],
      default: 'room'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);

