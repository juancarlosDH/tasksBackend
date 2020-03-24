const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController')

router.get('/', controller.list);
router.post('/', controller.save);
router.patch('/:id/complete', controller.complete);

module.exports = router;
