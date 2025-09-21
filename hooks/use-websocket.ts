import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  _id: string;
  sender: {
    _id: string;
    displayName: string;
    email: string;
    role: string;
  };
  receiver: string;
  content: string;
  messageType: string;
  isRead: boolean;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseWebSocketProps {
  token: string | null;
  onNewMessage?: (message: Message) => void;
  onUserTyping?: (data: { senderId: string; senderName: string }) => void;
  onUserStoppedTyping?: (data: { senderId: string }) => void;
}

export const useWebSocket = ({
  token,
  onNewMessage,
  onUserTyping,
  onUserStoppedTyping
}: UseWebSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    // Create socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      autoConnect: true
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setError(null);
      
      // Authenticate with token
      newSocket.emit('join', { token });
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    newSocket.on('authenticated', (data) => {
      console.log('WebSocket authenticated:', data);
    });

    newSocket.on('error', (error) => {
      console.error('WebSocket error:', error);
      setError(error.message);
    });

    // Message event handlers
    newSocket.on('new_message', (data) => {
      console.log('New message received:', data);
      onNewMessage?.(data.message);
    });

    newSocket.on('message_sent', (data) => {
      console.log('Message sent confirmation:', data);
    });

    newSocket.on('user_typing', (data) => {
      console.log('User typing:', data);
      onUserTyping?.(data);
    });

    newSocket.on('user_stopped_typing', (data) => {
      console.log('User stopped typing:', data);
      onUserStoppedTyping?.(data);
    });

    return () => {
      newSocket.close();
    };
  }, [token, onNewMessage, onUserTyping, onUserStoppedTyping]);

  const sendMessage = (receiverId: string, content: string, messageType = 'text') => {
    if (socket && isConnected) {
      socket.emit('send_message', {
        receiverId,
        content,
        messageType
      });
    }
  };

  const startTyping = (receiverId: string) => {
    if (socket && isConnected) {
      socket.emit('typing_start', { receiverId });
    }
  };

  const stopTyping = (receiverId: string) => {
    if (socket && isConnected) {
      socket.emit('typing_stop', { receiverId });
    }
  };

  return {
    socket,
    isConnected,
    error,
    sendMessage,
    startTyping,
    stopTyping
  };
};
