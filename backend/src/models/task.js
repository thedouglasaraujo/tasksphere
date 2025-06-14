'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creator_id'
      });

      Task.belongsTo(models.Project, {
        as: 'project',
        foreignKey: 'project_id'
      });
    }
  }

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    status: {
      type: DataTypes.ENUM('todo', 'in_progress', 'done'),
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isFuture(value) {
          if (new Date(value) <= new Date()) {
            throw new Error('A data de entrega deve ser futura');
          }
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task'
  });

  return Task;
};
