"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWebSocket } from '@/hooks/use-websocket';
import { useAuth } from './auth-context';

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

interface Conversation {
  conversationId: string;
  lastMessage: Message;
  unreadCount: number;
  otherUser: {
    _id: string;
    displayName: string;
    email: string;
    role: string;
  };
}

interface MessagingContextType {
  conversations: Conversation[];
  currentMessages: Message[];
  selectedConversation: string | null;
  isTyping: { [key: string]: boolean };
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredConversations: Conversation[];
  selectConversation: (conversationId: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
  loadConversations: () => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};

interface MessagingProviderProps {
  children: ReactNode;
}

export const MessagingProvider: React.FC<MessagingProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNewMessage = (message: Message) => {
    // Update current messages if this conversation is selected
    if (selectedConversation === message.conversationId) {
      setCurrentMessages(prev => [...prev, message]);
    }

    // Update conversations list
    setConversations(prev => {
      const existingConv = prev.find(conv => conv.conversationId === message.conversationId);
      if (existingConv) {
        return prev.map(conv => 
          conv.conversationId === message.conversationId
            ? { ...conv, lastMessage: message, unreadCount: conv.unreadCount + 1 }
            : conv
        );
      } else {
        // New conversation - we'll need to fetch the other user info
        return prev;
      }
    });
  };

  // Refresh conversations when user changes
  useEffect(() => {
    if (user && token) {
      loadConversations();
    }
  }, [user?.id, token]);

  const handleUserTyping = (data: { senderId: string; senderName: string }) => {
    setIsTyping(prev => ({ ...prev, [data.senderId]: true }));
    
    // Clear typing indicator after 3 seconds
    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [data.senderId]: false }));
    }, 3000);
  };

  const handleUserStoppedTyping = (data: { senderId: string }) => {
    setIsTyping(prev => ({ ...prev, [data.senderId]: false }));
  };

  const { sendMessage: wsSendMessage, isConnected, error: wsError } = useWebSocket({
    token,
    onNewMessage: handleNewMessage,
    onUserTyping: handleUserTyping,
    onUserStoppedTyping: handleUserStoppedTyping
  });

  const loadConversations = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      console.log('Loading conversations for user:', user?.id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/messages/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load conversations');
      }

      const data = await response.json();
      console.log('Conversations loaded:', data.conversations);
      setConversations(data.conversations);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/messages/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load messages');
      }

      const data = await response.json();
      setCurrentMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    if (!token) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const selectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    loadMessages(conversationId);
  };

  const sendMessage = (receiverId: string, content: string) => {
    if (wsSendMessage && isConnected) {
      wsSendMessage(receiverId, content);
    } else {
      setError('WebSocket not connected');
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.otherUser.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    if (wsError) {
      setError(wsError);
    }
  }, [wsError]);

  const value: MessagingContextType = {
    conversations,
    currentMessages,
    selectedConversation,
    isTyping,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filteredConversations,
    selectConversation,
    sendMessage,
    loadConversations,
    loadMessages,
    markAsRead
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
};
