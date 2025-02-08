const Contact = require('../models/contact');

// Create a new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: 'Contact message submitted successfully',
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact message', error: error.message });
  }
};

// Fetch all contact messages
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact messages', error: error.message });
  }
};

// Fetch a single contact message by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact message', error: error.message });
  }
};

// Delete a contact message by ID
exports.deleteContact = async (req, res) => {
  try {
    const result = await Contact.destroy({ where: { id: req.params.id } });
    if (!result) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact message', error: error.message });
  }
};
