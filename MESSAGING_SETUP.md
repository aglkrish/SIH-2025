# Real-time Messaging System Setup

This document explains how to set up and use the real-time messaging system between patients and practitioners.

## Features

- ✅ Real-time WebSocket communication
- ✅ Message persistence in MongoDB
- ✅ Typing indicators
- ✅ Unread message counts
- ✅ Conversation management
- ✅ Simple authentication (no complex auth needed)

## Backend Setup

### 1. Install Dependencies

```bash
cd SIH-TRIAL-master/backend
npm install socket.io
```

### 2. Environment Variables

Make sure your `.env` file includes:

```env
MONGODB_URI=mongodb://localhost:27017/ayursutra
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000
```

### 3. Start the Backend Server

```bash
cd SIH-TRIAL-master/backend
npm run dev
```

The server will run on `http://localhost:5000` with WebSocket support.

## Frontend Setup

### 1. Install Dependencies

```bash
cd SIH-TRIAL-master
npm install socket.io-client
```

### 2. Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`.

## How to Test

### 1. Create Test Users

1. Register a patient account at `http://localhost:3000/auth/register`
2. Register a practitioner account at `http://localhost:3000/auth/register`
3. Note down the user IDs from the database or console logs

### 2. Test Messaging

1. **Patient Side:**
   - Login as a patient
   - Go to Dashboard → Messages
   - The messaging interface will be available

2. **Practitioner Side:**
   - Login as a practitioner
   - Go to Dashboard → Messages
   - The messaging interface will be available

### 3. Send Messages

1. Both users need to be logged in
2. Messages are sent in real-time via WebSocket
3. Messages are persisted in the database
4. Typing indicators work automatically
5. Unread counts are tracked

## API Endpoints

### Messages

- `GET /api/messages/conversations` - Get user conversations
- `GET /api/messages/:conversationId` - Get messages for a conversation
- `POST /api/messages` - Send a new message
- `PUT /api/messages/:messageId/read` - Mark message as read

### WebSocket Events

#### Client → Server
- `join` - Authenticate and join user room
- `send_message` - Send a message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator

#### Server → Client
- `authenticated` - Authentication successful
- `new_message` - New message received
- `message_sent` - Message sent confirmation
- `user_typing` - User is typing
- `user_stopped_typing` - User stopped typing
- `error` - Error occurred

## Database Schema

### Message Model

```javascript
{
  sender: ObjectId, // User who sent the message
  receiver: ObjectId, // User who receives the message
  content: String, // Message content
  isRead: Boolean, // Read status
  messageType: String, // 'text', 'image', 'file'
  conversationId: String, // Generated conversation ID
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check if backend server is running on port 5000
   - Verify CORS settings in server.js
   - Check browser console for errors

2. **Messages Not Sending**
   - Verify user authentication
   - Check if both users exist in database
   - Check server logs for errors

3. **Real-time Updates Not Working**
   - Ensure WebSocket connection is established
   - Check if users are properly authenticated
   - Verify socket.io-client is installed

### Debug Mode

Enable debug logging by adding to your browser console:

```javascript
localStorage.debug = 'socket.io-client:*'
```

## Security Notes

- Messages are authenticated via JWT tokens
- WebSocket connections require valid authentication
- Message content is stored in plain text (consider encryption for production)
- No message history is deleted (implement cleanup for production)

## Production Considerations

1. **Rate Limiting**: Implement message rate limiting
2. **Message Encryption**: Encrypt sensitive message content
3. **Message Cleanup**: Implement automatic message deletion
4. **File Upload**: Add support for file attachments
5. **Message Search**: Implement full-text search
6. **Push Notifications**: Add mobile push notifications
7. **Message Moderation**: Add content filtering
8. **Backup**: Implement message backup strategies

## Support

For issues or questions, check the server logs and browser console for error messages.
