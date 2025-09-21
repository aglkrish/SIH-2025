# AyurSutra - Panchakarma Patient Management Software

A comprehensive patient management system designed specifically for Ayurveda practitioners and Panchakarma therapy management.

## 🚀 Features

- **Patient Management**: Complete patient profiles with health information and treatment history
- **Appointment Scheduling**: Intelligent scheduling system for practitioners and patients
- **Progress Tracking**: Monitor patient wellness metrics and treatment progress
- **Analytics Dashboard**: Comprehensive analytics for practice management
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Real-time Notifications**: Automated reminders and updates
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or pnpm
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIH-TRIAL-master
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Frontend Environment Variables
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
   ```

   Create a `.env` file in the backend directory:
   ```env
   # Backend Environment Variables
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   MONGODB_URI=mongodb://localhost:27017/ayursutra
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development servers**
   
   **Option 1: Start both servers separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

   **Option 2: Use the provided scripts**
   ```bash
   # Windows
   start-full-stack.ps1
   
   # Or
   start-project.bat
   ```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Comprehensive form validation
- **CORS Protection**: Configured cross-origin resource sharing
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for security headers
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form Validation**: Client-side and server-side validation
- **Error Boundaries**: React error boundaries for graceful error handling
- **Type Safety**: Full TypeScript implementation
- **API Error Handling**: Proper error responses and status codes

## 📱 Usage

### For Patients
1. Register/Login with patient role
2. View upcoming sessions
3. Track wellness progress
4. Book new appointments
5. Update health information

### For Practitioners
1. Register/Login with practitioner role
2. Manage patient appointments
3. View patient information
4. Track practice analytics
5. Schedule new appointments

## 🔧 Development

### Project Structure
```
SIH-TRIAL-master/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── layouts/          # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript types
├── backend/              # Backend server
└── public/               # Static assets
```

### Key Components
- **AuthProvider**: Authentication context and state management
- **AuthGuard**: Route protection based on user roles
- **ErrorBoundary**: Error handling and recovery
- **Loading**: Loading states and skeletons
- **Validation**: Form validation utilities

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy

### Backend (Railway/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy

### Environment Variables for Production
```env
# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_firebase_key
# ... other Firebase config

# Backend
NODE_ENV=production
JWT_SECRET=your_very_secure_production_jwt_secret
MONGODB_URI=your_production_mongodb_uri
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS_ORIGIN matches your frontend URL
   - Check that both servers are running

2. **Authentication Issues**
   - Verify JWT_SECRET is set correctly
   - Check token expiration (24 hours default)

3. **Build Errors**
   - Run `npm run lint` to check for linting errors
   - Ensure all TypeScript types are properly defined

4. **Database Connection**
   - Verify MongoDB URI is correct
   - Ensure MongoDB is running (if using local instance)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**Note**: This is a development version. For production deployment, ensure all security measures are properly configured and environment variables are set correctly.
