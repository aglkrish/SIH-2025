# 🏥 AyurSutra - Panchakarma Patient Management System

> **A comprehensive healthcare management platform for Ayurvedic Panchakarma treatments, built for SIH 2025**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

## 🌟 Features

### 👥 **Dual Dashboard System**
- **Patient Dashboard**: Session management, health tracking, messaging
- **Practitioner Dashboard**: Patient management, treatment planning, analytics

### 📅 **Appointment Management**
- Real-time session booking and scheduling
- Calendar integration with availability management
- Automated reminders and notifications
- Rescheduling and cancellation functionality

### 💬 **Communication System**
- Real-time messaging between patients and practitioners
- Notification center with multiple channels
- Treatment updates and progress reports

### 📊 **Health Tracking**
- Comprehensive health information management
- Treatment progress monitoring
- Dosha assessment and tracking
- Wellness metrics and analytics

### 💰 **Financial Management**
- INR-based pricing system
- Receipt generation and printing
- Payment tracking and history
- Treatment cost management

### 🎯 **Key Highlights**
- ✅ **Functional Action Buttons**: Initial Consultation & Continue Treatment
- ✅ **INR Currency**: All pricing in Indian Rupees (₹)
- ✅ **Modern UI/UX**: Professional healthcare interface
- ✅ **Responsive Design**: Works on all devices
- ✅ **Real-time Updates**: Live messaging and notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- MongoDB (optional for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aglkrish/SIH-2025.git
   cd SIH-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Start the development servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 🏗️ Project Structure

```
SIH-2025/
├── app/                          # Next.js app directory
│   ├── dashboard/
│   │   ├── patient/             # Patient dashboard pages
│   │   └── practitioner/        # Practitioner dashboard pages
│   ├── auth/                    # Authentication pages
│   └── api/                     # API routes
├── components/                   # Reusable UI components
│   ├── ui/                      # Shadcn/ui components
│   ├── dashboard/               # Dashboard-specific components
│   ├── dialogs/                 # Modal dialogs
│   └── layouts/                 # Page layouts
├── contexts/                     # React contexts
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── backend/                      # Node.js backend
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   └── server.js                # Main server file
└── types/                        # TypeScript type definitions
```

## 🎨 Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Real-time**: WebSocket support

## 📱 Key Pages & Features

### Patient Features
- **Dashboard**: Overview of sessions and health metrics
- **Session Management**: Book, view, and manage appointments
- **Health Profile**: Comprehensive health information
- **Messaging**: Real-time communication with practitioners
- **Progress Tracking**: Treatment progress and wellness metrics

### Practitioner Features
- **Patient Management**: View and manage patient information
- **Appointment Scheduling**: Manage calendar and appointments
- **Treatment Planning**: Create and update treatment plans
- **Analytics**: Practice analytics and reporting
- **Messaging**: Communicate with patients

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
MONGODB_URI=mongodb://localhost:27017/ayursutra
JWT_SECRET=your-jwt-secret
```

### Backend Configuration
Create a `.env` file in the `backend` directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ayursutra
JWT_SECRET=your-jwt-secret
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 📊 Demo Data

The application includes comprehensive demo data for:
- Sample patients and practitioners
- Treatment sessions and appointments
- Health information and progress tracking
- Messaging history and notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is developed for SIH 2025 (Smart India Hackathon).

## 👥 Team

- **Developer**: Krish Agarwal
- **Project**: AyurSutra - Panchakarma Patient Management System
- **Event**: SIH 2025

## 📞 Support

For support or questions, please contact:
- Email: [your-email@example.com]
- GitHub: [@aglkrish](https://github.com/aglkrish)

---

**Built with ❤️ for SIH 2025**