import asyncHandler from 'express-async-handler';
import Complaint from '../models/complaintModel.js';

// --Description: get all complaints
// --Route: GET /api/complaints
// --Access: Public
const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({})
    .sort({ createdAt: 'desc' })
    .exec();
  res.json(complaints);
});

// --Description: Get single Complaint
// --Route: GET /api/complaints
// --Access: Public
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    res.json(complaint);
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// --Description: Create a complaint
// --Route: POST /api/complaints
// --Access: Private
const createComplaint = asyncHandler(async (req, res) => {
  const { complaint_text } = req.body;
  const complaint = new Complaint({
    user: req.user._id,
    user_name: req.user.name,
    complaint_text: complaint_text,
  });

  const createdComplaint = await complaint.save();
  res.status(201).json(createdComplaint);
});

// --Description: Delete complaint
// --Route: DELETE /api/complaints/:id
// --Access: Private/admin
const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    await complaint.remove();
    res.json({ message: 'Complaint Removed' });
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// --Description: Update complaint
// --Route: PUT /api/complaints/:id
// --Access: Private/admin
const updateComplaint = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    complaint.status = status;

    const updatedComplaint = await complaint.save();
    res.status(201).json(updatedComplaint);
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// --Description: Add Comment to complaint
// --Route: POST /api/complaints/:id/comment
// --Access: Private
const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    const commentData = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    complaint.comments.push(commentData);

    complaint.numberOfComments = complaint.comments.length;

    await complaint.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// --Description: Get logged in user complaint
// --Route: GET /api/complaints/mycomplaints
// --Access: Private
const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });

  res.json(complaints);
});

export {
  getComplaints,
  getComplaintById,
  updateComplaint,
  createComment,
  getMyComplaints,
  createComplaint,
  deleteComplaint,
};
