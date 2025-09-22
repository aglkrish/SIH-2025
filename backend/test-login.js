const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const connectDB = require('./database');

async function testLogin() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if users exist
    const users = await User.find({});
    console.log('Total users in database:', users.length);
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Active: ${user.isActive}`);
    });

    // Test password comparison
    const testUser = await User.findOne({ email: 'patient@test.com' });
    if (testUser) {
      console.log('\nTesting password for patient@test.com:');
      const isPasswordValid = await testUser.comparePassword('password123');
      console.log('Password valid:', isPasswordValid);
      console.log('User active:', testUser.isActive);
      console.log('User role:', testUser.role);
    } else {
      console.log('patient@test.com not found!');
    }

    const testPractitioner = await User.findOne({ email: 'practitioner@test.com' });
    if (testPractitioner) {
      console.log('\nTesting password for practitioner@test.com:');
      const isPasswordValid = await testPractitioner.comparePassword('password123');
      console.log('Password valid:', isPasswordValid);
      console.log('User active:', testPractitioner.isActive);
      console.log('User role:', testPractitioner.role);
    } else {
      console.log('practitioner@test.com not found!');
    }

  } catch (error) {
    console.error('Error testing login:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

testLogin();
