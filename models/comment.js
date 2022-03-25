const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  replies: [ReplySchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total reply count 
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
})

const ReplySchema = new Schema(
  {
    // set cstom id to avoid confusion with parent comment _id 
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
)

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
