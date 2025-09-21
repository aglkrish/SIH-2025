const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  practitioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  treatment: {
    type: String,
    required: true,
    enum: ['Abhyanga', 'Shirodhara', 'Nasya', 'Basti', 'Virechana', 'Raktamokshana', 'Panchakarma Consultation', 'Follow-up Consultation']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 60 // in minutes
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  treatmentNotes: {
    type: String,
    maxlength: 2000
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  cost: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ patient: 1, date: 1 });
appointmentSchema.index({ practitioner: 1, date: 1 });
appointmentSchema.index({ status: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
