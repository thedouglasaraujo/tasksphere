const { Project, User } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const { name, description, start_date, end_date } = req.body;

            const project = await Project.create({
                name,
                description,
                start_date,
                end_date,
                creator_id: req.user.id
            });

            await project.addCollaborator(req.user.id);

            return res.status(201).json(project);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar projeto' });
        }
    },

    async index(req, res) {
        try {
            const projects = await Project.findAll({
                include: [
                    {
                        association: 'collaborators',
                        where: { id: req.user.id },
                        attributes: []
                    }
                ]
            });

            return res.json(projects);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar projetos' });
        }
    },

    async show(req, res) {
        try {
            const project = await Project.findByPk(req.params.id, {
                include: [
                    {
                        association: 'collaborators',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        association: 'tasks',
                        attributes: ['id', 'title', 'status', 'due_date', 'image_url']
                    }
                ]
            });

            if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });

            const isCollaborator = await project.hasCollaborator(req.user.id);
            if (!isCollaborator) return res.status(403).json({ error: 'Acesso negado ao projeto' });

            return res.json(project);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar projeto' });
        }
    },

    async update(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });

            if (project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode editar o projeto' });
            }

            await project.update(req.body);
            return res.json(project);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar projeto' });
        }
    },

    async destroy(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });

            if (project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode excluir o projeto' });
            }

            await project.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao excluir projeto' });
        }
    },

    async getCollaborators(req, res) {
        try {
            const project = await Project.findByPk(req.params.id, {
                include: [
                    {
                        association: 'collaborators',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });

            return res.json(project.collaborators);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao listar colaboradores' });
        }
    },

    async addCollaborator(req, res) {
        try {
            const { name, email, password } = req.body;

            const project = await Project.findByPk(req.params.id);

            if (!project) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }

            if (project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode adicionar colaboradores' });
            }

            let user = await User.findOne({ where: { email } });

            if (!user) {
                user = await User.create({ name, email, password });
            }

            await project.addCollaborator(user);

            return res.status(200).json({ message: 'Colaborador adicionado com sucesso' });
        } catch (err) {
            console.error('Erro ao adicionar colaborador:', err);
            return res.status(500).json({ error: 'Erro ao adicionar colaborador' });
        }
    },

    async removeCollaborator(req, res) {
        try {
            const { userId } = req.body;
            const project = await Project.findByPk(req.params.id);

            if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
            if (project.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Apenas o criador pode remover colaboradores' });
            }

            await project.removeCollaborator(userId);
            return res.status(200).json({ message: 'Colaborador removido' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao remover colaborador' });
        }
    }
};
