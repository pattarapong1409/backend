const express = require('express');

const { body } = require('express-validator');

const router = express.Router()

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
            .custom(async (email) => {
                const user = await User.find(email);
                if (user[0].length > 0) {
                    return Promise.reject('Email address already exist!')
                }
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 7 })// มีค่ามากกว่าหรือเท่ากับ 7 ตัวอักษรหรือไม่.
    ], authController.signup
);


router.post('/login', authController.login);

router.get('/show/:id', authController.getCurrentUser);

router.post('/getUsedetail', authController.getUsedetail);



router.put('/updatePassword', authController.updatePassword);

router.put('/changeName',  authController.changeName);

router.put('/changeAvatar',  authController.changeAvatar);


// router.get('/checkToken', authController.checkToken);

// router.get('/getaccount', authController.getaccount);


// router.get('/checkToken', authController.checkToken);

// router.get('/findID:id', authController.finduserId);
      

module.exports = router;