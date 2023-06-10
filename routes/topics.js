const express = require('express');
const router = express.Router();
const topicsCtrl = require('../controllers/topics');

// /*---------- Public Routes ----------*/
router.post('/create', topicsCtrl.createTopic);
router.post('/search/:keyword', topicsCtrl.search);
router.post('/search/', topicsCtrl.search);
router.get('/all', topicsCtrl.getAllTopics);
router.get('/user/:id', topicsCtrl.getUserTopics);
router.delete('/:id', topicsCtrl.deleteTopic);


/*---------- Protected Routes ----------*/




module.exports = router;