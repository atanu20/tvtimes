const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);

router.post('/activation', userCtrl.activateEmail);

router.post('/login', userCtrl.login);

router.get('/infor', auth, userCtrl.getUserInfor);
router.post('/bookseatformovie', auth, userCtrl.bookSeatForMovie);
router.post('/getBookedList', auth, userCtrl.getBookedList);
router.post(
  '/getUserBookedListbyhashId',
  auth,
  userCtrl.getUserBookedListbyhashId
);
router.get('/getMyBooked', auth, userCtrl.getMyBooked);

// router.patch('/userallthings', auth, userCtrl.updateAllDetails);
// Social Login

module.exports = router;
