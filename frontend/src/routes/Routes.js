import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from '~/layouts/ProtectedLayout';
import CollaboratorsManager from '~/pages/CollaboratorsManager';
import Dashboard from '~/pages/Dashboard';
import ErrorPage from '~/pages/ErrorPage';
import Login from '~/pages/Login';
import ProjectDetails from '~/pages/ProjectDetails';
import ProjectForm from '~/pages/ProjectForm';
import TaskForm from '~/pages/TaskForm';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="projects/:id/collaborators" element={<CollaboratorsManager />} />
          <Route path="projects/:projectId/tasks/new" element={<TaskForm />} />
          <Route path="tasks/:taskId/edit" element={<TaskForm />} />
        </Route>

        <Route path="/forbidden" element={<ErrorPage code={403} />} />
        <Route path="/error" element={<ErrorPage code={500} />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
