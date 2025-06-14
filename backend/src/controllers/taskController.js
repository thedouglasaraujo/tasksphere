const { Task, Project, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async create(req, res) {
        try {
            const { title, status, due_date, image_url, project_id } = req.body;

            const project = await Project.findByPk(project_id, {
                include: [{ association: 'collaborators', where: { id: req.user.id } }]
            });

            if (!project) return res.status(403).json({ error: 'Você não é colaborador deste projeto.' });

            const task = await Task.create({
                title,
                status,
                due_date,
                image_url,
                project_id,
                creator_id: req.user.id
            });

            return res.status(201).json(task);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
    },

    async index(req, res) {
        try {
            const { title, status, project_id, page = 1, limit = 10 } = req.query;

            const filters = {};

            if (title) filters.title = { [Op.iLike]: `%${title}%` };
            if (status) filters.status = status;
            if (project_id) filters.project_id = project_id;

            const userProjects = await req.user.getCollaborations({ attributes: ['id'] });
            const projectIds = userProjects.map(p => p.id);

            filters.project_id = { [Op.in]: projectIds };

            const tasks = await Task.findAndCountAll({
                where: filters,
                limit: parseInt(limit),
                offset: (parseInt(page) - 1) * parseInt(limit),
                order: [['due_date', 'ASC']]
            });

            return res.json({
                total: tasks.count,
                page: parseInt(page),
                pages: Math.ceil(tasks.count / limit),
                data: tasks.rows
            });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
    },

    async show(req, res) {
        try {
            const task = await Task.findByPk(req.params.id, {
                include: ['creator', 'project']
            });

            if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const project = await Project.findByPk(task.project_id, {
                include: [{ association: 'collaborators', where: { id: req.user.id } }]
            });

            if (!project) return res.status(403).json({ error: 'Acesso negado à tarefa' });

            return res.json(task);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar tarefa' });
        }
    },

    async update(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const project = await Project.findByPk(task.project_id);

            if (task.creator_id !== req.user.id && project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Sem permissão para editar' });
            }

            await task.update(req.body);
            return res.json(task);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
    },

    async destroy(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

            const project = await Project.findByPk(task.project_id);

            if (task.creator_id !== req.user.id && project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Sem permissão para excluir' });
            }

            await task.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao excluir tarefa' });
        }
    }
};
