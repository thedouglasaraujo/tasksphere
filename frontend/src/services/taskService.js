import { request } from './apiClient';

export const getTasks = ({ search, status, projectId, page = 1, limit = 10 } = {}) => {
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (projectId) params.append('projectId', projectId);
    params.append('page', page);
    params.append('limit', limit);

    return request(`/tasks?${params.toString()}`);
};

export const getTaskById = (id) => request(`/tasks/${id}`);

export const createTask = (data) => request('/tasks', { method: 'POST', body: data });

export const updateTask = (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: data });

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
