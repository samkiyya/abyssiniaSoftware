const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Create a new subscription plan
router.post('/plans', subscriptionController.createSubscriptionPlan);

// Edit an existing subscription plan
router.put('/plans/:id', subscriptionController.updateSubscriptionPlan);

// View all subscription plans
router.get('/plans', subscriptionController.getAllSubscriptionPlans);

// View a specific subscription plan by ID
router.get('/plans/:id', subscriptionController.getSubscriptionPlanById);

// Cancel a subscription plan
router.put('/plans/cancel/:id', subscriptionController.cancelSubscriptionPlan);

// Resume a cancelled subscription plan
router.put('/plans/resume/:id', subscriptionController.resumeSubscriptionPlan);

// Subscribe to a plan
router.post('/subscribe', subscriptionController.subscribeToPlan);

// Get all subscribers for a specific plan
router.get('/subscribers/:planId', subscriptionController.getSubscribersByPlan);

// Update subscriber status (active, paused, or cancelled)
router.put('/subscribers/status/:subscriberId', subscriptionController.updateSubscriberStatus);
router.delete('/plans/:id', subscriptionController.deleteSubscriptionPlan);

// Delete Subscriber
router.delete('/subscribers/:id', subscriptionController.deleteSubscriber);

module.exports = router;
