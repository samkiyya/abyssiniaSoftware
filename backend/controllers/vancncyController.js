const Vacancy = require('../models/vacancy');

// Create a new vacancy
exports.createVacancy = async (req, res) => {
  try {
    const { title, description, department, location, employmentType, salaryRange, status } = req.body;
    const newVacancy = await Vacancy.create({
      title,
      description,
      department,
      location,
      employmentType,
      salaryRange,
      status,
    });
    res.status(201).json({ message: 'Vacancy created successfully', vacancy: newVacancy });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vacancy', error: error.message });
  }
};

// Get all vacancies
exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vacancies', error: error.message });
  }
};

// Get a specific vacancy by ID
exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vacancy', error: error.message });
  }
};

// Update a vacancy by ID
exports.updateVacancy = async (req, res) => {
  try {
    const { title, description, department, location, employmentType, salaryRange, status } = req.body;
    const vacancy = await Vacancy.findByPk(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    const updatedVacancy = await vacancy.update({
      title: title || vacancy.title,
      description: description || vacancy.description,
      department: department || vacancy.department,
      location: location || vacancy.location,
      employmentType: employmentType || vacancy.employmentType,
      salaryRange: salaryRange || vacancy.salaryRange,
      status: status || vacancy.status,
    });

    res.status(200).json({ message: 'Vacancy updated successfully', vacancy: updatedVacancy });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vacancy', error: error.message });
  }
};

// Delete a vacancy by ID
exports.deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    await vacancy.destroy();
    res.status(200).json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vacancy', error: error.message });
  }
};
