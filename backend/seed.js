const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://wildrazzer_db_user:VakTjDnSXsaAmdHl@cluster0.pk6emef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});

    // Create test users
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
      },
      {
        email: 'patient2@test.com',
        password: 'password123',
        role: 'patient',
        displayName: 'Sarah Johnson',
        profile: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          phone: '+1 (555) 234-5678'
        },
        healthInfo: {
          doshaType: 'kapha',
          primaryConcerns: ['Digestive Issues', 'Weight Management'],
          allergies: ['Dairy'],
          currentMedications: ['Triphala']
        }
      },
      {
        email: 'practitioner2@test.com',
        password: 'password123',
        role: 'practitioner',
        displayName: 'Dr. Raj Patel',
        profile: {
          firstName: 'Raj',
          lastName: 'Patel',
          phone: '+1 (555) 876-5432'
        }
      },
      {
        email: 'ayan@gmail.com',
        password: 'password123',
        role: 'patient',
        displayName: 'Ayan User',
        profile: {
          firstName: 'Ayan',
          lastName: 'User',
          phone: '+1 (555) 111-2222'
        },
        healthInfo: {
          doshaType: 'vata',
          primaryConcerns: ['General Wellness'],
          allergies: ['None reported'],
          currentMedications: []
        }
      }
    ];

    // Create users
    const createdUsers = await User.insertMany(testUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create test appointments
    const patient1 = createdUsers.find(u => u.email === 'patient@test.com');
    const patient2 = createdUsers.find(u => u.email === 'patient2@test.com');
    const practitioner1 = createdUsers.find(u => u.email === 'practitioner@test.com');
    const practitioner2 = createdUsers.find(u => u.email === 'practitioner2@test.com');

    const testAppointments = [
      {
        patient: patient1._id,
        practitioner: practitioner1._id,
        treatment: 'Abhyanga',
        date: new Date('2024-01-15T09:00:00Z'),
        time: '9:00 AM',
        duration: 60,
        status: 'confirmed',
        location: 'Wellness Center - Room 3',
        notes: 'First session, discuss treatment plan',
        cost: 150
      },
      {
        patient: patient2._id,
        practitioner: practitioner1._id,
        treatment: 'Shirodhara',
        date: new Date('2024-01-15T10:30:00Z'),
        time: '10:30 AM',
        duration: 45,
        status: 'in-progress',
        location: 'Wellness Center - Room 1',
        notes: 'Follow-up session, check stress levels',
        cost: 120
      },
      {
        patient: patient1._id,
        practitioner: practitioner2._id,
        treatment: 'Panchakarma Consultation',
        date: new Date('2024-01-16T14:00:00Z'),
        time: '2:00 PM',
        duration: 30,
        status: 'scheduled',
        location: 'Consultation Room 2',
        notes: 'Initial consultation for Panchakarma',
        cost: 100
      }
    ];

    await Appointment.insertMany(testAppointments);
    console.log(`Created ${testAppointments.length} appointments`);

    console.log('\n=== SEED DATA CREATED ===');
    console.log('Test Users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.email} / password123 (${user.role})`);
    });
    console.log('\nDatabase seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
