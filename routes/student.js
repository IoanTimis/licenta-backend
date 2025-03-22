const express = require('express');
const router  = express.Router(); 

const { isCompleteProfile } = require('../middlewares/completeProfile');
const { isStudent } = require('../middlewares/student');

router.use([isStudent]);

const studentController = require('../controllers/student'); 

router.get('/fetch/topics', studentController.studentTopics);
router.get('/fetch/topic/:id', studentController.topic);

router.get('/fetch/requested-topics', studentController.getRequestTopics);
router.get('/fetch/requested-topic/:id', studentController.getRequestTopic);

router.get('/fetch/favorite-topics', studentController.getFavoriteTopics);

router.post('/favorite/add/:id', studentController.addFavoriteTopic);
router.delete('/favorite/delete/:id', studentController.removeFavoriteTopic);

router.get('/is-topic-favorite/:id', studentController.isTopicFavorite);

router.get('/is-topic-requested/:id', studentController.isTopicRequested);

router.post('/request/add', studentController.newRequest);
router.put('/request/confirm/:id', studentController.confirmRequest);
router.delete('/request/delete/:id', studentController.deleteRequest);

router.post('/request/comment/add/:id', studentController.addComment);

router.get('/search-filter/topics', studentController.topicSearchFilter);

module.exports = router;
