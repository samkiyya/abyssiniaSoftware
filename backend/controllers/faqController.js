const FAQ = require('../models/faq');

// Create a new FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await FAQ.create({
      question,
      answer
    });

    res.status(201).json({ message: 'FAQ created successfully', faq });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll();
    res.status(200).json({ faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single FAQ by ID
exports.getFAQById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ faq });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a FAQ by ID
exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    await faq.save();

    res.status(200).json({ message: 'FAQ updated successfully', faq });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a FAQ by ID
exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.destroy();

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
