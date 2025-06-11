import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'

const isAuthenticated = () => {
    return !!localStorage.getItem('token')
}

function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Rotas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                        </PrivateRoute>
                    }
                />

                {/* Redireciona para login por padrão */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
