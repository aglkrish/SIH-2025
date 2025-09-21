const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config();

const connectDB = require('./database');

async function createTestData() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Create test users if they don't exist
    let patient = await User.findOne({ email: 'patient@test.com' });
    if (!patient) {
      patient = new User({
        email: 'patient@test.com',
        password: 'password123',
        displayName: 'John Patient',
        role: 'patient'
      });
      await patient.save();
      console.log('Created patient user');
    }

    let practitioner = await User.findOne({ email: 'practitioner@test.com' });
    if (!practitioner) {
      practitioner = new User({
        email: 'practitioner@test.com',
        password: 'password123',
        displayName: 'Dr. Sarah Sharma',
        role: 'practitioner'
      });
      await practitioner.save();
      console.log('Created practitioner user');
    }

    // Create test messages
    const conversationId = Message.generateConversationId(patient._id, practitioner._id);
    
    // Clear existing messages for this conversation
    await Message.deleteMany({ conversationId });

    const messages = [
      {
        sender: patient._id,
        receiver: practitioner._id,
        content: 'Hello Dr. Sharma, I wanted to ask about my treatment plan.',
        conversationId: conversationId
      },
      {
        sender: practitioner._id,
        receiver: patient._id,
        content: 'Hello John! I\'m happy to help. What specific questions do you have?',
        conversationId: conversationId
      },
      {
        sender: patient._id,
        receiver: practitioner._id,
        content: 'I\'ve been following the diet plan you recommended. Should I continue with the same herbs?',
        conversationId: conversationId
      },
      {
        sender: practitioner._id,
        receiver: patient._id,
        content: 'Yes, please continue with the current herbs for another week. I\'ll review your progress in our next session.',
        conversationId: conversationId
      }
    ];

    for (const messageData of messages) {
      const message = new Message(messageData);
      await message.save();
    }

    console.log('Created test messages');
    console.log('Patient ID:', patient._id);
    console.log('Practitioner ID:', practitioner._id);
    console.log('Conversation ID:', conversationId);

  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestData();
