import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProjectDetails from '../pages/ProjectDetails'
import ProjectForm from '../pages/ProjectForm'
import TaskForm from '../pages/TaskForm'
import CollaboratorsManager from '../pages/CollaboratorsManager'

const isAuthenticated = () => {
    return !!localStorage.getItem('token')
}

function PrivateRoute({ children }) {
    return children
    return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/new"
                    element={
                        <PrivateRoute>
                            <ProjectForm />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:id"
                    element={
                        <PrivateRoute>
                            <ProjectDetails />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:id/edit"
                    element={
                        <PrivateRoute>
                            <ProjectForm />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:id/collaborators"
                    element={
                        <PrivateRoute>
                            <CollaboratorsManager />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:projectId/tasks/new"
                    element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/tasks/:taskId/edit"
                    element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
