const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 

const imgsController = require('../controllers/imgs');

router.use(bodyParser.json());


router.get('/', imgsController.fetchAll);
router.put('/update-score/:id', imgsController.updatePoints);
router.get('/top-ten', imgsController.fetchTopTen);
router.get('/top-ten-user', imgsController.fetchTopTenUser);
router.get('/find/:id', imgsController.onlyone);

router.post('/upload', imgsController.upload);

module.exports = router;