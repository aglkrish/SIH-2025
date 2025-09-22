const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const connectDB = require('./database');

async function fixUsers() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create users individually to trigger password hashing
    const testUsers = [
      {
        email: 'patient@test.com',
        password: 'password123',
        role: 'patient',
        displayName: 'John Patient',
        profile: {
          firstName: 'John',
          lastName: 'Patient',
          phone: '+1 (555) 123-4567',
          address: {
            city: 'San Francisco',
            state: 'CA',
            country: 'USA'
          }
        },
        healthInfo: {
          doshaType: 'vata-pitta',
          primaryConcerns: ['Stress', 'Sleep Issues'],
          allergies: ['None reported'],
          currentMedications: ['Ashwagandha', 'Brahmi']
        }
      },
      {
        email: 'practitioner@test.com',
        password: 'password123',
        role: 'practitioner',
        displayName: 'Dr. Priya Sharma',
        profile: {
          firstName: 'Priya',
          lastName: 'Sharma',
          phone: '+1 (555) 987-6543',
          address: {
            city: 'San Francisco',
            state: 'CA',
            country: 'USA'
          }
        }
      }
    ];

    // Create users one by one to ensure password hashing
    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email} (${user.role})`);
    }

    // Test password comparison
    const testUser = await User.findOne({ email: 'patient@test.com' });
    if (testUser) {
      console.log('\nTesting password for patient@test.com:');
      const isPasswordValid = await testUser.comparePassword('password123');
      console.log('Password valid:', isPasswordValid);
    }

    const testPractitioner = await User.findOne({ email: 'practitioner@test.com' });
    if (testPractitioner) {
      console.log('\nTesting password for practitioner@test.com:');
      const isPasswordValid = await testPractitioner.comparePassword('password123');
      console.log('Password valid:', isPasswordValid);
    }

    console.log('\n✅ Users fixed successfully!');

  } catch (error) {
    console.error('Error fixing users:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

fixUsers();
