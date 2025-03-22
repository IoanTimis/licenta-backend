const express = require('express');
const router  = express.Router();

const authController = require('../controllers/auth');

router.get('/check-session', authController.checkSession);

router.post('/refresh', authController.refreshAccessToken);

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback);

router.put('/complete-profile/as-teacher/:token', authController.completeProfileTeacher);

router.put('/complete-profile/as-student/:token', authController.completeProfileStudent);

module.exports = router;
