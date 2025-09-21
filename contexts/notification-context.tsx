"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { useWebSocket } from '@/hooks/use-websocket';

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  appointment?: {
    _id: string;
    treatment: string;
    date: string;
    time: string;
    status: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  loadNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  createNotification: (type: string, title: string, message: string, appointmentId?: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load notifications');
      }

      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!token) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.isRead) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const createNotification = async (type: string, title: string, message: string, appointmentId?: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/notifications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          title,
          message,
          appointmentId,
          priority: type === 'appointment' ? 'high' : 'medium'
        })
      });

      if (response.ok) {
        const newNotification = await response.json();
        addNotification(newNotification.notification);
      }
    } catch (err) {
      console.error('Error creating notification:', err);
    }
  };

  // Load notifications when user changes
  useEffect(() => {
    if (user && token) {
      loadNotifications();
    }
  }, [user?.id, token]);

  // Handle WebSocket notifications
  const handleNewNotification = (data: any) => {
    addNotification(data.notification);
  };

  const { isConnected } = useWebSocket({
    token,
    onNewMessage: () => {}, // Not used for notifications
    onUserTyping: () => {},
    onUserStoppedTyping: () => {}
  });

  // Listen for WebSocket events
  useEffect(() => {
    if (isConnected) {
      // Add WebSocket event listeners here if needed
      // For now, we'll rely on polling
    }
  }, [isConnected]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    error,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    createNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
