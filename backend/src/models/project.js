'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creator_id'
      });

      Project.belongsToMany(models.User, {
        through: 'ProjectCollaborators',
        as: 'collaborators',
        foreignKey: 'project_id',
        otherKey: 'user_id'
      });
    }
  }

  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfterStart(value) {
          if (this.start_date && value <= this.start_date) {
            throw new Error('A data final deve ser posterior à data inicial');
          }
        }
      }
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project'
  });

  return Project;
};
