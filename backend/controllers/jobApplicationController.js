const JobApplication = require('../models/jobapplication');
const Vacancy = require('../models/vacancy');

// Create a new job application
exports.createApplication = async (req, res) => {
  try {
    const { fullName, email, phone, coverLetter, vacancyId } = req.body;
    const resume = req.file ? req.file.path : null;

    const vacancy = await Vacancy.findByPk(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    const newApplication = await JobApplication.create({
      fullName,
      email,
      phone,
      resume,
      coverLetter,
      vacancyId,
    });

    res.status(201).json({ message: 'Job application submitted successfully', application: newApplication });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting job application', error: error.message });
  }
};

// Get all job applications with associated vacancy info
exports.getAllApplications = async (req, res) => {
  try {
    // Base URL from environment variables
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;

    // Fetch applications along with associated vacancies
    const applications = await JobApplication.findAll({
      include: [{ model: Vacancy, attributes: ['title', 'department', 'location'] }],
    });

    // Map applications to include full image URL
    const applicationsWithFullImageUrl = applications.map(application => ({
      ...application.toJSON(), // Convert Sequelize model instance to plain object
      resume: application.resume ? `${baseUrl}/${application.resume}` : null, // Assuming 'imagePath' contains the relative path
    }));

    res.status(200).json(applicationsWithFullImageUrl);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Error fetching job applications', error: error.message });
  }
};


// Get a specific job application by ID with vacancy info
exports.getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.id, {
      include: [{ model: Vacancy, attributes: ['title', 'department', 'location'] }],
    });

    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job application', error: error.message });
  }
};

// Update a job application by ID
exports.updateApplication = async (req, res) => {
  try {
    const { fullName, email, phone, coverLetter, status } = req.body;
    const application = await JobApplication.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    const updatedApplication = await application.update({
      fullName: fullName || application.fullName,
      email: email || application.email,
      phone: phone || application.phone,
      coverLetter: coverLetter || application.coverLetter,
      status: status || application.status,
    });

    res.status(200).json({ message: 'Job application updated successfully', application: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job application', error: error.message });
  }
};

// Delete a job application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    await application.destroy();
    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job application', error: error.message });
  }
};
