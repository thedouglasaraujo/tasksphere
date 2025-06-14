const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

router.use(auth);

router.post('/', taskController.create);
router.get('/', taskController.index);
router.get('/:id', taskController.show);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.destroy);

module.exports = router;
