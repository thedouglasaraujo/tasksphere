const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const projectController = require('../controllers/projectController');

router.use(auth);

router.post('/', projectController.create);
router.get('/', projectController.index);
router.get('/:id', projectController.show);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.destroy);

router.get('/:id/collaborators', projectController.getCollaborators); 
router.post('/:id/collaborators', projectController.addCollaborator);
router.delete('/:id/collaborators', projectController.removeCollaborator);

module.exports = router;
