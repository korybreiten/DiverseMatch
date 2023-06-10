const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

/*---------- Public Routes ----------*/
router.post('/join', usersCtrl.join);
router.post('/login', usersCtrl.login);
router.get('/username/:username', usersCtrl.getUsername);


/*---------- Protected Routes ----------*/




module.exports = router;