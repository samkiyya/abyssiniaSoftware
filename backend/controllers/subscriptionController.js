const SubscriptionPlan = require('../models/subscriptionPlan');
const Subscriber = require('../models/subscriber');

// Create a new subscription plan
exports.createSubscriptionPlan = async (req, res) => {
  try {
    const { name, price, frequency, productSelection } = req.body;

    const newPlan = await SubscriptionPlan.create({
      name,
      price,
      frequency,
      productSelection,
    });

    res.status(201).json({ message: 'Subscription plan created successfully', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription plan', error: error.message });
  }
};

// Edit an existing subscription plan
exports.updateSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, frequency, productSelection } = req.body;

    const plan = await SubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    const updatedPlan = await plan.update({
      name: name || plan.name,
      price: price || plan.price,
      frequency: frequency || plan.frequency,
      productSelection: productSelection || plan.productSelection,
    });

    res.status(200).json({ message: 'Subscription plan updated successfully', plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription plan', error: error.message });
  }
};

// View all subscription plans
exports.getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription plans', error: error.message });
  }
};

// View a specific subscription plan by ID
exports.getSubscriptionPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription plan', error: error.message });
  }
};

// Cancel a subscription plan
exports.cancelSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    plan.isActive = false;
    await plan.save();

    res.status(200).json({ message: 'Subscription plan cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling subscription plan', error: error.message });
  }
};

// Resume a cancelled subscription plan
exports.resumeSubscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    plan.isActive = true;
    await plan.save();

    res.status(200).json({ message: 'Subscription plan resumed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resuming subscription plan', error: error.message });
  }
};

// Subscribe to a plan
exports.subscribeToPlan = async (req, res) => {
  try {
    const { fullName, email, phone, subscriptionPlanId, startDate } = req.body;

    const plan = await SubscriptionPlan.findByPk(subscriptionPlanId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    const newSubscriber = await Subscriber.create({
      fullName,
      email,
      phone,
      subscriptionPlanId,
      startDate,
    });

    res.status(201).json({ message: 'Subscription successful', subscriber: newSubscriber });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to plan', error: error.message });
  }
};

// Get the list of subscribers for a specific plan
exports.getSubscribersByPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const subscribers = await Subscriber.findAll({
      where: { subscriptionPlanId: planId },
      include: [{ model: SubscriptionPlan, attributes: ['name', 'price', 'frequency'] }],
    });

    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers', error: error.message });
  }
};

// Manage subscriber's subscription status (Cancel/Resume)
exports.updateSubscriberStatus = async (req, res) => {
  try {
    const { subscriberId } = req.params;
    const { status } = req.body;

    const subscriber = await Subscriber.findByPk(subscriberId);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    subscriber.status = status;
    await subscriber.save();

    res.status(200).json({ message: 'Subscriber status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscriber status', error: error.message });
  }
};




// Delete Subscription Plan
exports.deleteSubscriptionPlan = async (req, res) => {
  try {
    const planId = req.params.id;

    // Check if the plan exists
    const plan = await SubscriptionPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }

    // Delete the subscription plan
    await plan.destroy();
    res.status(200).json({ message: 'Subscription plan deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the subscription plan' });
  }
};

// Delete Subscriber
exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriberId = req.params.id;

    // Check if the subscriber exists
    const subscriber = await Subscriber.findByPk(subscriberId);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    // Delete the subscriber
    await subscriber.destroy();
    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the subscriber' });
  }
};
