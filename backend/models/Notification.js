const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['appointment_scheduled', 'appointment_updated', 'appointment_reminder', 'procedure_precaution', 'welcome', 'message'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ scheduledFor: 1, type: 1 });

// Static method to create appointment reminder
notificationSchema.statics.createAppointmentReminder = async function(appointment, reminderType = 'pre') {
  const reminderTime = new Date(appointment.date);
  
  if (reminderType === 'pre') {
    // 24 hours before appointment
    reminderTime.setHours(reminderTime.getHours() - 24);
  } else {
    // 1 hour after appointment
    reminderTime.setHours(reminderTime.getHours() + 1);
  }

  const notifications = [];

  // Create notification for patient
  notifications.push({
    user: appointment.patient,
    type: 'appointment_reminder',
    title: reminderType === 'pre' ? 'Upcoming Appointment Reminder' : 'Post-Procedure Care',
    message: reminderType === 'pre' 
      ? `Your ${appointment.treatment} appointment with ${appointment.practitioner.displayName} is tomorrow at ${appointment.time}. Please follow pre-procedure guidelines.`
      : `Your ${appointment.treatment} session is complete. Please follow post-procedure care instructions.`,
    appointment: appointment._id,
    priority: 'high',
    scheduledFor: reminderTime,
    metadata: { reminderType, appointmentId: appointment._id }
  });

  // Create notification for practitioner
  notifications.push({
    user: appointment.practitioner,
    type: 'appointment_reminder',
    title: reminderType === 'pre' ? 'Upcoming Appointment Reminder' : 'Post-Procedure Follow-up',
    message: reminderType === 'pre'
      ? `You have a ${appointment.treatment} appointment with ${appointment.patient.displayName} tomorrow at ${appointment.time}.`
      : `Follow-up required for ${appointment.patient.displayName}'s ${appointment.treatment} session.`,
    appointment: appointment._id,
    priority: 'medium',
    scheduledFor: reminderTime,
    metadata: { reminderType, appointmentId: appointment._id }
  });

  return this.insertMany(notifications);
};

// Static method to create welcome notification
notificationSchema.statics.createWelcomeNotification = async function(userId, userName) {
  return this.create({
    user: userId,
    type: 'welcome',
    title: 'Welcome to AyurSutra!',
    message: `Welcome back, ${userName}! We're excited to help you on your wellness journey.`,
    priority: 'low'
  });
};

module.exports = mongoose.model('Notification', notificationSchema);
