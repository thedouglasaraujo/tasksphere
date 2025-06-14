import { request } from './apiClient';

export const getProjects = () => request('/projects');

export const getProjectById = (id) => request(`/projects/${id}`);

export const createProject = (data) => request('/projects', { method: 'POST', body: data });

export const updateProject = (id, data) => request(`/projects/${id}`, { method: 'PUT', body: data });

export const deleteProject = (id) => request(`/projects/${id}`, { method: 'DELETE' });

export const addCollaborator = (projectId, userId) =>
  request(`/projects/${projectId}/collaborators`, { method: 'POST', body: { userId } });

export const removeCollaborator = (projectId, userId) =>
  request(`/projects/${projectId}/collaborators`, { method: 'DELETE', body: { userId } });
