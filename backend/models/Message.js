const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  conversationId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Create a compound index for efficient querying
messageSchema.index({ conversationId: 1, createdAt: -1 });

// Static method to generate conversation ID
messageSchema.statics.generateConversationId = function(senderId, receiverId) {
  const sortedIds = [senderId, receiverId].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
};

// Static method to get conversation messages
messageSchema.statics.getConversationMessages = async function(conversationId, limit = 50, skip = 0) {
  return this.find({ conversationId })
    .populate('sender', 'displayName email role')
    .populate('receiver', 'displayName email role')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to get user conversations
messageSchema.statics.getUserConversations = async function(userId) {
  const conversations = await this.aggregate([
    {
      $match: {
        $or: [
          { sender: new mongoose.Types.ObjectId(userId) },
          { receiver: new mongoose.Types.ObjectId(userId) }
        ]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: '$conversationId',
        lastMessage: { $first: '$$ROOT' },
        unreadCount: {
          $sum: {
            $cond: [
              { $and: [{ $eq: ['$receiver', new mongoose.Types.ObjectId(userId)] }, { $eq: ['$isRead', false] }] },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'lastMessage.sender',
        foreignField: '_id',
        as: 'senderInfo'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'lastMessage.receiver',
        foreignField: '_id',
        as: 'receiverInfo'
      }
    },
    {
      $project: {
        conversationId: '$_id',
        lastMessage: 1,
        unreadCount: 1,
        otherUser: {
          $cond: [
            { $eq: ['$lastMessage.sender', new mongoose.Types.ObjectId(userId)] },
            { $arrayElemAt: ['$receiverInfo', 0] },
            { $arrayElemAt: ['$senderInfo', 0] }
          ]
        }
      }
    }
  ]);

  return conversations;
};

module.exports = mongoose.model('Message', messageSchema);
