const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');
/*---------- Public Routes ----------*/
router.post('/interest/:id', profileCtrl.addInterest);
router.post('/dislike/:id', profileCtrl.addDislike);
router.get('/interests', profileCtrl.getInterests);
router.get('/dislikes', profileCtrl.getDislikes);
router.get('/matches', profileCtrl.getMatches);
router.delete('/interest/:id', profileCtrl.deleteInterest);
router.delete('/dislike/:id', profileCtrl.deleteDislike);




/*---------- Protected Routes ----------*/




module.exports = router;