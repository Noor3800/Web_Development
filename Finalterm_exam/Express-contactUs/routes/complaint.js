const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const { isAuthenticated, isAdmin } = require('../routes/auth'); 

// Show complaint form (only for logged-in users)
router.get('/contact', isAuthenticated, (req, res) => {
  res.render('contact');
});

// Handle complaint submission
router.post('/contact', isAuthenticated, async (req, res) => {
  const { orderId, message } = req.body;
  
  await Complaint.create({
    user: req.session.user._id,
    orderId,
    message
  });

  res.redirect('/complaints/userComplaints');
});

// Show user's complaints
router.get('/userComplaints', isAuthenticated, async (req, res) => {
  const complaints = await Complaint.find({ user: req.session.user._id });
  res.render('userComplaints', { complaints });
});

// Admin view: Show all complaints
router.get('/allcomplaints', isAdmin, async (req, res) => {
  const complaints = await Complaint.find().populate('user');
  res.render('allComplaints', { complaints });
});

module.exports = router;