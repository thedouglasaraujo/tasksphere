'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectCollaborators = sequelize.define('ProjectCollaborators', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'id',
            },
        },
    });

    ProjectCollaborators.associate = (models) => {
        ProjectCollaborators.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        ProjectCollaborators.belongsTo(models.Project, {
            foreignKey: 'project_id',
            as: 'project',
        });
    };

    return ProjectCollaborators;
};
