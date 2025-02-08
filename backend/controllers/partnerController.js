const Partner = require('../models/partner');

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    const { name, partnershipType } = req.body;
    const logoUrl = req.file ? `/uploads/partners/${req.file.filename}` : null;

 

    const newPartner = await Partner.create({
      name,
      logoUrl,
      partnershipType,
    });

    res.status(201).json({ message: 'Partner created successfully', partner: newPartner });
  } catch (error) {
    res.status(500).json({ message: 'Error creating partner', error: error.message });
  }
};

// Get all partners
exports.getPartners = async (req, res) => {
  try {
    // Base URL from environment variables or request host
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;

    // Fetch all partners
    const partners = await Partner.findAll();

    // Map partners to include the full image URL
    const partnersWithFullImageUrl = partners.map(partner => ({
      ...partner.toJSON(), // Convert Sequelize model instance to plain object
      logoUrl: partner.logoUrl ? `${baseUrl}${partner.logoUrl}` : null, // Assuming 'logoPath' contains the relative image path
    }));

    res.status(200).json(partnersWithFullImageUrl);
  } catch (error) {
    console.error('Error retrieving partners:', error);
    res.status(500).json({ message: 'Error retrieving partners', error: error.message });
  }
};

// Get a partner by ID
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving partner', error: error.message });
  }
};

// Delete a partner by ID
exports.deletePartner = async (req, res) => {
  try {
    const result = await Partner.destroy({ where: { id: req.params.id } });
    if (!result) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner', error: error.message });
  }
};
// Update a partner by ID
exports.updatePartner = async (req, res) => {
    try {
      const { name, partnershipType } = req.body;
      let logoUrl = null;
  
      // If a new logo is uploaded, update the logo URL
      if (req.file) {
        logoUrl = `/uploads/partners/${req.file.filename}`;
      }
  
      // Find the partner by ID
      const partner = await Partner.findByPk(req.params.id);
      if (!partner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
  
      // Update partner details
      const updatedPartner = await partner.update({
        name: name || partner.name,
        partnershipType: partnershipType || partner.partnershipType,
        logoUrl: logoUrl || partner.logoUrl,
      });
  
      res.status(200).json({ message: 'Partner updated successfully', partner: updatedPartner });
    } catch (error) {
      res.status(500).json({ message: 'Error updating partner', error: error.message });
    }
  };
  