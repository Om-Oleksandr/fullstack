const NotFoundError = require('../errors/NotFoundError');
const { Group } = require('../models');

module.exports.checkGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();

    if (groups.length === 0) {
      return next(new NotFoundError('Groups not found!!!'));
    }
    console.log(groups);
    req.groups = groups;
    next();
  } catch (error) {
    next(error);
  }
};
