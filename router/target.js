const express = require('express');
const router = express.Router();

const {
    getAllTarget,
    addCourse,
    getCourse
} = require('../controller/target');

router.route('/').get(getAllTarget).post(addCourse);
router.route('/:id').get(getCourse);

module.exports = router;