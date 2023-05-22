const { Router } = require('express');

const upload = require('../middlewares/upload.mw');
const GroupController = require('../controllers/group.controller');
const { checkGroups } = require('../middlewares/group.mw');
const groupRouter = Router();

groupRouter.post('/', upload.single('image'), GroupController.createGroup);
groupRouter.get('/', checkGroups, GroupController.getGroups);
groupRouter.get('/:idGroup', GroupController.getGroup);
groupRouter.get('/users/:idUser', GroupController.getUserGroups);

groupRouter.get('/:idGroup/users', GroupController.getGroupUsers);

groupRouter.patch('/:idGroup/:idUser/add', GroupController.addUserAtGroup);

groupRouter.put(
  '/:idGroup',
  upload.single('image'),
  GroupController.updateGroup
);

groupRouter.delete('/:idGroup', GroupController.deleteGroup);

groupRouter.patch(
  '/:idGroup/:idUser/remove',
  GroupController.deleteUserFromGroup
);

groupRouter.get('/:idGroup', GroupController.countUsers);
groupRouter.patch('/:idGroup/image', GroupController.addImage);

module.exports = groupRouter;
