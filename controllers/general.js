const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');

const getFaculties = async (req, res) => {
  try {
      const faculties = await Faculty.findAll();
      if (faculties.length === 0) {
          return res.status(404).send('Faculties not found');
      }
      
      res.json(faculties);
  } catch (error) {
      console.error('Error fetching faculties:', error);
      res.status(500).send('Internal Server Error');
  }
};

const getSpecializations = async (req, res) => { 
  try {
      const faculty_id = req.params.id;
      const specializations = await Specialization.findAll({ where: { faculty_id: faculty_id } });
      if (specializations.length === 0) {
          return res.status(404).send('Specializations not found');
      }
      
      res.json(specializations);
  } catch (error) {
      console.error('Error fetching specializations:', error);
      res.status(500).send('Internal Server Error');
  }
};

const getFacultiesSpecializations = async (req, res) => {
  try {
      const faculties = await Faculty.findAll({
          include: Specialization
      });
      
      if (faculties.length === 0) {
          return res.status(404).send('Faculties not found');
      }
      
      res.json(faculties);
  } catch (error) {
      console.error('Error fetching faculties:', error);
      res.status(500).send('Internal Server Error');
  }
};

const getFacultySpecializations = async (req, res) => {
  try {
      const faculty_id = req.params.id;
      const faculty = await Faculty.findByPk(faculty_id, {
          include: Specialization
      });
      
      if (!faculty) {
          return res.status(404).send('Faculty not found');
      }
      
      res.json(faculty);
  } catch (error) {
      console.error('Error fetching faculty:', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getFaculties,
  getSpecializations,
  getFacultiesSpecializations,
  getFacultySpecializations
};