"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { motion } from "framer-motion"
import { useMessaging } from "@/contexts/messaging-context"
import { useAuth } from "@/contexts/auth-context"
import { MessagingDebug } from "@/components/debug/messaging-debug"

export default function MessagesPage() {
  const { user } = useAuth();
  const { 
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
    sendMessage 
  } = useMessaging();
  
  const [newMessage, setNewMessage] = useState("")
  const [selectedConv, setSelectedConv] = useState<any>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConv) {
      sendMessage(selectedConv.otherUser._id, newMessage);
      setNewMessage("");
    }
  }

  const handleConversationSelect = (conversation: any) => {
    setSelectedConv(conversation);
    selectConversation(conversation.conversationId);
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  }

  if (loading && conversations.length === 0) {
    return (
      <PatientLayout>
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-emerald-600 mt-2">Loading messages...</p>
            </div>
          </div>
        </div>
      </PatientLayout>
    );
  }

  if (error) {
    return (
      <PatientLayout>
        <div className="container mx-auto p-6">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="container mx-auto p-6">
        <MessagingDebug />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Messages</h1>
            <p className="text-emerald-600 mt-2">Communicate with your practitioners</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="border-emerald-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-900">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search practitioners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.conversationId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 cursor-pointer hover:bg-emerald-50 transition-colors ${
                        selectedConv?.conversationId === conversation.conversationId ? "bg-emerald-50 border-r-2 border-emerald-500" : ""
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700">
                              {conversation.otherUser.displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-emerald-900 truncate">{conversation.otherUser.displayName}</p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-emerald-500 text-white text-xs">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-1">{conversation.lastMessage.content}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTime(conversation.lastMessage.createdAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 border-emerald-200 flex flex-col">
            {selectedConv ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {selectedConv.otherUser.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-emerald-900">{selectedConv.otherUser.displayName}</h3>
                        <p className="text-xs text-emerald-600">
                          {isTyping[selectedConv.otherUser._id] ? "Typing..." : "Online"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {currentMessages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          No messages yet. Start a conversation!
                        </div>
                      ) : (
                        currentMessages.map((message, index) => (
                          <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex ${message.sender._id === user?.id ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] ${
                                message.sender._id === user?.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-900"
                              } rounded-lg p-3`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender._id === user?.id ? "text-emerald-100" : "text-gray-500"
                                }`}
                              >
                                {formatTime(message.createdAt)}
                              </p>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <Separator />
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PatientLayout>
  )
}
