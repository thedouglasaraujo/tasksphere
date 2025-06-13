import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProjectDetails from '../pages/ProjectDetails'
import ProjectForm from '../pages/ProjectForm'

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
                    path="/projects/new"
                    element={
                        <PrivateRoute>
                            <ProjectForm />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
