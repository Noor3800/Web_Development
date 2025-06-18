const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

// Show complaint form (only for logged-in users)
router.get('/contact', isLoggedIn, (req, res) => {
  res.render('contact');
});

// Handle complaint submission
router.post('/contact', isLoggedIn, async (req, res) => {
  const { orderId, message } = req.body;
  await Complaint.create({
    user: req.session.userId,
    orderId,
    message
  });
  res.redirect('/complaints/my');
});

// Show user's complaints
router.get('/complaints/my', isLoggedIn, async (req, res) => {
  const complaints = await Complaint.find({ user: req.session.userId });
  res.render('my_complaints', { complaints });
});

// Admin view: Show all complaints
router.get('/admin/complaints', isAdmin, async (req, res) => {
  const complaints = await Complaint.find().populate('user');
  res.render('admin_complaints', { complaints });
});

module.exports = router;
