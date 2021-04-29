import mongoose from 'mongoose';

// Complaint comments model schema
const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Complaint Model Schema.
const complaintSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    user_name: {
      type: String,
      required: true,
    },
    complaint_text: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    numberOfComments: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['resolved', 'pending', 'dismissed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
