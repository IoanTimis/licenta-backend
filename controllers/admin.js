const User = require('../models/user');
const Faculty = require('../models/faculty');
const Specialization = require('../models/specialization');
const TeacherEmail = require('../models/teacherEmail');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// Faculties---------------------------------------------------------------------------------------------------
const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();
    res.json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getFacultiesSpecializations = async (req, res) => {
  try {
    const faculties = await Faculty.findAll({
      include: { model: Specialization, as: 'specializations' }
    });

    if (!faculties) {
      return res.status(404).json({ error: 'Faculties not found' });
    }

    res.json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    await faculty.update(req.body);
    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.destroy({ where: { id: req.params.id } });
    res.json({ success: faculty ? true : false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Specializations---------------------------------------------------------------------------------------------------
const getSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.findAll({
      include: { model: Faculty, as: 'faculty' }
    });

    if(!specializations) {
      return res.status(404).json({ error: 'Specializations not found' });
    }

    const faculties = await Faculty.findAll();

    if(!faculties) {
      return res.status(404).json({ error: 'Faculties not found' });
    }

    res.json({ specializations, faculties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByPk(req.params.id);
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });

    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getFacultySpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.findAll({ where: { faculty_id: req.params.id } });
    res.json(specializations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.create(req.body);
    res.status(201).json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const editSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByPk(req.params.id);
    if (!specialization) return res.status(404).json({ error: 'Specialization not found' });

    await specialization.update(req.body);
    res.json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.destroy({ where: { id: req.params.id } });
    res.json({ success: specialization ? true : false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Users---------------------------------------------------------------------------------------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      return res.status(404).json({ error: 'Users not found' });
    }

    const faculties = await Faculty.findAll({
      include: { model: Specialization, as: 'specializations' }
    });

    if (!faculties) {
      return res.status(404).json({ error: 'Faculties not found' });
    }

    res.json({ users, faculties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.type === 'student') {
      const faculty = await user.getFaculty();
      const specialization = await user.getSpecialization();

      if (!faculty || !specialization) {
        return res.status(404).json({ error: 'Faculty or Specialization not found' });
      }

      return res.json({
        ...user.toJSON(),
        facultyId: faculty.id,
        facultyName: faculty.name,
        specializationId: specialization.id,
        specializationName: specialization.name,
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, first_name, email, title, education_level, type, faculty_id, specialization_id } = req.body;
    const password = await bcrypt.hash(req.body.password, 8);
    

    const user = await User.create({
      name,
      first_name,
      email,
      password,
      title,
      education_level,
      type,
      complete_profile: true,
      faculty_id,
      specialization_id,
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const editUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    res.json({ success: user ? true : false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherEmail.findAll();

    if (!teachers) {
      return res.status(404).json({ error: 'Teachers not found' });
    }

    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } 
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await TeacherEmail.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addTeacher = async (req, res) => {
  try {
    const teacher = await TeacherEmail.create(req.body);

    if(!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const editTeacher = async (req, res) => {
  try {
    const teacher = await TeacherEmail.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    await teacher.update(req.body);
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await TeacherEmail.destroy({ where: { id: req.params.id }  });
    res.json({ success: teacher ? true : false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getFaculties,
  getFaculty,
  getFacultiesSpecializations,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getSpecializations,
  getFacultySpecializations,
  getSpecialization,
  addSpecialization,
  editSpecialization,
  deleteSpecialization,
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
  getTeachers,
  getTeacher,
  addTeacher,
  editTeacher,
  deleteTeacher,
};
