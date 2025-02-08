// controllers/aboutCompanyController.js
const AboutCompany = require('../models/about');

// Create a new AboutCompany
exports.createAboutCompany = async (req, res) => {
  try {
    const { companyName, companyDescription, visionStatement, visionMotto, phoneNumber, email, address, socialMediaLinks } = req.body;

    const newCompany = await AboutCompany.create({
      companyName,
      companyDescription,
      visionStatement,
      visionMotto,  // Include visionMotto here
      phoneNumber,
      email,
      address,
      socialMediaLinks
    });

    return res.status(201).json({ message: 'Company information created successfully', data: newCompany });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating company information', error });
  }
};

// Get all AboutCompany records
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await AboutCompany.findAll();
    return res.status(200).json({ data: companies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching companies', error });
  }
};

// Get a single AboutCompany record by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await AboutCompany.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.status(200).json({ data: company });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching company by ID', error });
  }
};

// Update an AboutCompany record by ID
exports.updateCompany = async (req, res) => {
  try {
    const { companyName, companyDescription, visionStatement, visionMotto, phoneNumber, email, address, socialMediaLinks } = req.body;

    const company = await AboutCompany.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const updatedCompany = await company.update({
      companyName,
      companyDescription,
      visionStatement,
      visionMotto,
      phoneNumber,
      email,
      address,
      socialMediaLinks
    });

    return res.status(200).json({ message: 'Company information updated successfully', data: updatedCompany });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating company information', error });
  }
};

// Delete an AboutCompany record by ID
exports.deleteCompany = async (req, res) => {
  try {
    const company = await AboutCompany.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    await company.destroy();

    return res.status(200).json({ message: 'Company information deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting company information', error });
  }
};
