const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Message = require('./models/Message');
const Notification = require('./models/Notification');
require('dotenv').config();

const connectDB = require('./database');

async function testCompleteSystem() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing test data
    await User.deleteMany({ email: { $in: ['patient@test.com', 'practitioner@test.com'] } });
    await Appointment.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});

    console.log('Cleared existing test data');

    // Create test users
    const patient = new User({
      email: 'patient@test.com',
      password: 'password123',
      displayName: 'John Patient',
      role: 'patient',
      profile: {
        firstName: 'John',
        lastName: 'Patient'
      }
    });
    await patient.save();
    console.log('Created patient user:', patient.displayName);

    const practitioner = new User({
      email: 'practitioner@test.com',
      password: 'password123',
      displayName: 'Dr. Sarah Sharma',
      role: 'practitioner',
      profile: {
        firstName: 'Sarah',
        lastName: 'Sharma'
      }
    });
    await practitioner.save();
    console.log('Created practitioner user:', practitioner.displayName);

    // Create welcome notifications
    await Notification.createWelcomeNotification(patient._id, patient.displayName);
    await Notification.createWelcomeNotification(practitioner._id, practitioner.displayName);
    console.log('Created welcome notifications');

    // Create test appointment
    const appointment = new Appointment({
      patient: patient._id,
      practitioner: practitioner._id,
      treatment: 'Abhyanga',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: '10:00 AM',
      duration: 60,
      location: 'Wellness Center - Room 1',
      notes: 'First session for stress management',
      cost: 120,
      status: 'scheduled'
    });
    await appointment.save();
    console.log('Created test appointment');

    // Create appointment notification
    await Notification.create({
      user: practitioner._id,
      type: 'appointment_scheduled',
      title: 'New Appointment Scheduled',
      message: `${patient.displayName} has scheduled a Abhyanga appointment for ${appointment.date.toLocaleDateString()} at ${appointment.time}`,
      appointment: appointment._id,
      priority: 'high'
    });
    console.log('Created appointment notification');

    // Create appointment reminders
    await Notification.createAppointmentReminder(appointment, 'pre');
    console.log('Created appointment reminders');

    // Create test messages
    const conversationId = Message.generateConversationId(patient._id, practitioner._id);
    
    const messages = [
      {
        sender: patient._id,
        receiver: practitioner._id,
        content: 'Hello Dr. Sharma, I wanted to confirm my appointment for tomorrow.',
        conversationId: conversationId
      },
      {
        sender: practitioner._id,
        receiver: patient._id,
        content: 'Hello John! Yes, your Abhyanga session is confirmed for tomorrow at 10:00 AM. Please arrive 15 minutes early.',
        conversationId: conversationId
      },
      {
        sender: patient._id,
        receiver: practitioner._id,
        content: 'Thank you! Should I follow any specific diet before the session?',
        conversationId: conversationId
      },
      {
        sender: practitioner._id,
        receiver: patient._id,
        content: 'Yes, please have a light breakfast and avoid heavy foods. Also, drink plenty of water.',
        conversationId: conversationId
      }
    ];

    for (const messageData of messages) {
      const message = new Message(messageData);
      await message.save();
    }
    console.log('Created test messages');

    // Create message notifications
    await Notification.create({
      user: practitioner._id,
      type: 'message',
      title: 'New Message',
      message: `You have a new message from ${patient.displayName}`,
      priority: 'medium'
    });

    await Notification.create({
      user: patient._id,
      type: 'message',
      title: 'New Message',
      message: `You have a new message from ${practitioner.displayName}`,
      priority: 'medium'
    });
    console.log('Created message notifications');

    // Create procedure precaution notifications
    await Notification.create({
      user: patient._id,
      type: 'procedure_precaution',
      title: 'Pre-Procedure Guidelines',
      message: 'Your Abhyanga session is tomorrow. Please follow the pre-procedure guidelines: light breakfast, plenty of water, and arrive 15 minutes early.',
      appointment: appointment._id,
      priority: 'high'
    });

    await Notification.create({
      user: practitioner._id,
      type: 'procedure_precaution',
      title: 'Pre-Procedure Preparation',
      message: `Prepare for ${patient.displayName}'s Abhyanga session tomorrow at 10:00 AM. Ensure all equipment is ready.`,
      appointment: appointment._id,
      priority: 'medium'
    });
    console.log('Created procedure precaution notifications');

    // Summary
    console.log('\n=== TEST DATA SUMMARY ===');
    console.log('Patient ID:', patient._id);
    console.log('Practitioner ID:', practitioner._id);
    console.log('Appointment ID:', appointment._id);
    console.log('Conversation ID:', conversationId);
    
    const totalNotifications = await Notification.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    
    console.log('Total Notifications:', totalNotifications);
    console.log('Total Messages:', totalMessages);
    console.log('Total Appointments:', totalAppointments);
    
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Patient: patient@test.com / password123');
    console.log('Practitioner: practitioner@test.com / password123');
    
    console.log('\n=== FEATURES TO TEST ===');
    console.log('1. Login with both accounts');
    console.log('2. Check welcome message on dashboard');
    console.log('3. Check notification bell for unread notifications');
    console.log('4. Test messaging between patient and practitioner');
    console.log('5. Test appointment scheduling');
    console.log('6. Test real-time notifications');

  } catch (error) {
    console.error('Error setting up test data:', error);
  } finally {
    mongoose.connection.close();
  }
}

testCompleteSystem();
