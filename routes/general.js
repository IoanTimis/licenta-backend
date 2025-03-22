const express = require('express');
const router  = express.Router();

const { isCompleteProfile } = require('../middlewares/completeProfile');

const generalController = require('../controllers/general');

router.get('/fetch/faculties', generalController.getFaculties);
router.get('/fetch/specializations/:id', generalController.getSpecializations);
router.get('/fetch/faculties-specializations', generalController.getFacultiesSpecializations);
router.get('/fetch/faculty-specializations/:id', generalController.getFacultySpecializations);

module.exports = router;