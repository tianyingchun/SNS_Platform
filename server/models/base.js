var Sequelize = require('sequelize');

var attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  }
};

module.exports = attributes;
