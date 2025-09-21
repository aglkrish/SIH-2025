const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const config = require('./config');
const connectDB = require('./database');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Message = require('./models/Message');
const Notification = require('./models/Notification');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.CORS_ORIGIN,
    methods: ["GET", "POST"]
  }
});
const PORT = config.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AyurSutra API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    console.log('Login attempt:', { email });

    // Find user in database
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('User logged in successfully:', user.email, 'Role:', user.role);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        displayName: user.displayName,
        token: token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, displayName, role } = req.body;
    
    // Input validation
    if (!email || !password || !displayName || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Role validation
    if (!['patient', 'practitioner'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either patient or practitioner'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password: password, // Will be hashed by pre-save middleware
      role: role,
      displayName: displayName,
      profile: {
        firstName: displayName.split(' ')[0] || '',
        lastName: displayName.split(' ').slice(1).join(' ') || ''
      }
    });

    await newUser.save();

    // Create welcome notification
    await Notification.createWelcomeNotification(newUser._id, newUser.displayName);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newUser._id, 
        email: newUser.email, 
        role: newUser.role 
      },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('User registered successfully:', newUser.email, 'Role:', newUser.role);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        displayName: newUser.displayName,
        token: token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Appointments routes
app.get('/api/appointments', verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { patient: req.user.id },
        { practitioner: req.user.id }
      ]
    })
    .populate('patient', 'displayName email profile.firstName profile.lastName')
    .populate('practitioner', 'displayName email profile.firstName profile.lastName')
    .sort({ date: 1 });

    res.json({
      success: true,
      appointments: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments'
    });
  }
});

// Create new appointment
app.post('/api/appointments', verifyToken, async (req, res) => {
  try {
    const { practitionerId, treatment, date, time, duration, location, notes, cost } = req.body;

    // Validate required fields
    if (!practitionerId || !treatment || !date || !time || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if practitioner exists
    const practitioner = await User.findById(practitionerId);
    if (!practitioner || practitioner.role !== 'practitioner') {
      return res.status(404).json({
        success: false,
        message: 'Practitioner not found'
      });
    }

    // Create appointment
    const appointment = new Appointment({
      patient: req.user.id,
      practitioner: practitionerId,
      treatment,
      date: new Date(date),
      time,
      duration: duration || 60,
      location,
      notes,
      cost: cost || 0,
      status: 'scheduled'
    });

    await appointment.save();

    // Populate the appointment with user details
    await appointment.populate('patient', 'displayName email profile.firstName profile.lastName');
    await appointment.populate('practitioner', 'displayName email profile.firstName profile.lastName');

    // Create notifications
    await Notification.create({
      user: practitionerId,
      type: 'appointment_scheduled',
      title: 'New Appointment Scheduled',
      message: `${appointment.patient.displayName} has scheduled a ${treatment} appointment for ${new Date(date).toLocaleDateString()} at ${time}`,
      appointment: appointment._id,
      priority: 'high'
    });

    // Create appointment reminders
    await Notification.createAppointmentReminder(appointment, 'pre');

    // Emit real-time notification to practitioner
    io.emit('new_appointment', {
      appointment: appointment,
      message: `New appointment scheduled by ${appointment.patient.displayName}`
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      appointment: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment'
    });
  }
});

// Update appointment status
app.put('/api/appointments/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, treatmentNotes, followUpRequired, followUpDate } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status, 
        treatmentNotes, 
        followUpRequired, 
        followUpDate: followUpDate ? new Date(followUpDate) : undefined 
      },
      { new: true }
    ).populate('patient', 'displayName email profile.firstName profile.lastName')
     .populate('practitioner', 'displayName email profile.firstName profile.lastName');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Emit real-time notification
    io.emit('appointment_updated', {
      appointment: appointment,
      message: `Appointment status updated to ${status}`
    });

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment: appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment'
    });
  }
});

// Fallback mock data route (for testing without MongoDB)
app.get('/api/appointments/mock', verifyToken, (req, res) => {
  const mockAppointments = [
    {
      id: "1",
      patient: "Sarah Johnson",
      patientEmail: "sarah.johnson@email.com",
      patientPhone: "+1 (555) 123-4567",
      treatment: "Abhyanga",
      date: "2024-01-15",
      time: "9:00 AM",
      duration: "60 min",
      status: "confirmed",
      location: "Wellness Center - Room 3",
      notes: "First session, discuss treatment plan. Patient has mild anxiety.",
      price: "$120",
      paymentStatus: "paid",
    },
    {
      id: "2",
      patient: "Michael Chen",
      patientEmail: "michael.chen@email.com",
      patientPhone: "+1 (555) 234-5678",
      treatment: "Shirodhara",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "45 min",
      status: "in-progress",
      location: "Wellness Center - Room 1",
      notes: "Follow-up session, check stress levels. Responding well to treatment.",
      price: "$100",
      paymentStatus: "paid",
    },
    {
      id: "3",
      patient: "Emily Davis",
      patientEmail: "emily.davis@email.com",
      patientPhone: "+1 (555) 345-6789",
      treatment: "Consultation",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "30 min",
      status: "confirmed",
      location: "Consultation Room 2",
      notes: "Initial consultation for Panchakarma. Discuss treatment options.",
      price: "$80",
      paymentStatus: "pending",
    }
  ];
  
  res.json({
    success: true,
    appointments: mockAppointments
  });
});

app.put('/api/appointments/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  res.json({
    success: true,
    message: `Appointment ${id} updated to ${status}`,
    appointmentId: id,
    newStatus: status
  });
});

// Patients routes
app.get('/api/patients', verifyToken, async (req, res) => {
  try {
    // Only practitioners can view patients
    if (req.user.role !== 'practitioner') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only practitioners can view patients.'
      });
    }

    const patients = await User.find({ role: 'patient', isActive: true })
      .select('displayName email profile phone lastLogin healthInfo')
      .sort({ displayName: 1 });

    res.json({
      success: true,
      patients: patients
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patients'
    });
  }
});

// Analytics routes
app.get('/api/analytics', verifyToken, async (req, res) => {
  try {
    // Only practitioners can view analytics
    if (req.user.role !== 'practitioner') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only practitioners can view analytics.'
      });
    }

    const totalPatients = await User.countDocuments({ role: 'patient', isActive: true });
    const totalAppointments = await Appointment.countDocuments({ practitioner: req.user.id });
    const completedAppointments = await Appointment.countDocuments({ 
      practitioner: req.user.id, 
      status: 'completed' 
    });
    
    const successRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    
    const analytics = {
      totalPatients,
      totalAppointments,
      completedAppointments,
      successRate,
      revenue: 12500, // TODO: Calculate from actual data
      monthlyGrowth: 12.5 // TODO: Calculate from actual data
    };
    
    res.json({
      success: true,
      analytics: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics'
    });
  }
});

// Message routes
app.get('/api/messages/conversations', verifyToken, async (req, res) => {
  try {
    const conversations = await Message.getUserConversations(req.user.id);
    res.json({
      success: true,
      conversations: conversations
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations'
    });
  }
});

app.get('/api/messages/:conversationId', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.getConversationMessages(conversationId, parseInt(limit), parseInt(skip));
    
    res.json({
      success: true,
      messages: messages.reverse() // Return in chronological order
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

app.post('/api/messages', verifyToken, async (req, res) => {
  try {
    const { receiverId, content, messageType = 'text' } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Receiver ID and content are required'
      });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      });
    }

    // Generate conversation ID
    const conversationId = Message.generateConversationId(req.user.id, receiverId);

    // Create message
    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content,
      messageType,
      conversationId
    });

    await message.save();

    // Populate sender info for response
    await message.populate('sender', 'displayName email role');

    res.status(201).json({
      success: true,
      message: message
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
    });
  }
});

app.put('/api/messages/:messageId/read', verifyToken, async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as read'
    });
  }
});

// Notification routes
app.get('/api/notifications', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const skip = (page - 1) * limit;

    let query = { user: req.user.id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .populate('appointment', 'treatment date time status')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const totalCount = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ user: req.user.id, isRead: false });

    res.json({
      success: true,
      notifications: notifications,
      totalCount: totalCount,
      unreadCount: unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications'
    });
  }
});

app.put('/api/notifications/:id/read', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking notification as read'
    });
  }
});

app.put('/api/notifications/read-all', verifyToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking all notifications as read'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// WebSocket handling
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user authentication and join room
  socket.on('join', async (data) => {
    try {
      const { token } = data;
      if (!token) {
        socket.emit('error', { message: 'Authentication token required' });
        return;
      }

      // Verify JWT token
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.id).select('displayName email role');
      
      if (!user) {
        socket.emit('error', { message: 'User not found' });
        return;
      }

      // Store user info and join user-specific room
      connectedUsers.set(socket.id, {
        userId: user._id.toString(),
        userInfo: user,
        socketId: socket.id
      });

      socket.join(`user_${user._id}`);
      socket.emit('authenticated', { user: user });
      console.log(`User ${user.displayName} (${user.role}) connected`);
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('error', { message: 'Invalid authentication token' });
    }
  });

  // Handle sending messages
  socket.on('send_message', async (data) => {
    try {
      const user = connectedUsers.get(socket.id);
      if (!user) {
        socket.emit('error', { message: 'User not authenticated' });
        return;
      }

      const { receiverId, content, messageType = 'text' } = data;

      if (!receiverId || !content) {
        socket.emit('error', { message: 'Receiver ID and content are required' });
        return;
      }

      // Check if receiver exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        socket.emit('error', { message: 'Receiver not found' });
        return;
      }

      // Generate conversation ID
      const conversationId = Message.generateConversationId(user.userId, receiverId);

      // Create message
      const message = new Message({
        sender: user.userId,
        receiver: receiverId,
        content,
        messageType,
        conversationId
      });

      await message.save();
      await message.populate('sender', 'displayName email role');

      // Emit to sender
      socket.emit('message_sent', { message });

      // Emit to receiver if online
      const receiverSocket = Array.from(connectedUsers.values())
        .find(u => u.userId === receiverId);
      
      if (receiverSocket) {
        io.to(`user_${receiverId}`).emit('new_message', { message });
      }

      console.log(`Message sent from ${user.userInfo.displayName} to ${receiver.displayName}`);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Error sending message' });
    }
  });

  // Handle typing indicators
  socket.on('typing_start', (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(`user_${data.receiverId}`).emit('user_typing', {
        senderId: user.userId,
        senderName: user.userInfo.displayName
      });
    }
  });

  socket.on('typing_stop', (data) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(`user_${data.receiverId}`).emit('user_stopped_typing', {
        senderId: user.userId
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`User ${user.userInfo.displayName} disconnected`);
      connectedUsers.delete(socket.id);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 AyurSutra API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔌 WebSocket server running on port ${PORT}`);
});

module.exports = app;

