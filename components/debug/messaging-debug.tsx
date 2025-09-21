"use client";

import { useMessaging } from "@/contexts/messaging-context";
import { useAuth } from "@/contexts/auth-context";

export function MessagingDebug() {
  const { user } = useAuth();
  const { conversations, loading, error, searchQuery, setSearchQuery } = useMessaging();

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="font-bold text-lg mb-2">Messaging Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>User ID:</strong> {user?.id || 'Not logged in'}
        </div>
        <div>
          <strong>User Name:</strong> {user?.displayName || 'No name'}
        </div>
        <div>
          <strong>User Role:</strong> {user?.role || 'No role'}
        </div>
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        <div>
          <strong>Conversations Count:</strong> {conversations.length}
        </div>
        <div>
          <strong>Search Query:</strong> "{searchQuery}"
        </div>
      </div>

      {conversations.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Conversations:</h4>
          <div className="space-y-1">
            {conversations.map((conv, index) => (
              <div key={conv.conversationId} className="text-xs bg-white p-2 rounded">
                <div><strong>ID:</strong> {conv.conversationId}</div>
                <div><strong>Other User:</strong> {conv.otherUser?.displayName || 'Unknown'}</div>
                <div><strong>Last Message:</strong> {conv.lastMessage?.content || 'No message'}</div>
                <div><strong>Unread:</strong> {conv.unreadCount}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
