import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout.jsx';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Login from './components/pages/auth/Login.jsx';
import Register from './components/pages/auth/Register.jsx';
import Dashboard from './components/pages/dashboard/Dashboard.jsx';
import ChatPage from './components/pages/chat/ChatPage.jsx';
import Profile from './components/pages/profile/Profile.jsx';
import AdminDashboard from './components/pages/admin/AdminDashboard.jsx';

// Context Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { ChatProvider } from './context/ChatContext';
import { ProgressProvider } from './context/ProgressContext';

// PrivateRoute component for protected routes
const PrivateRoute = ({ children }) => {
  // Check if user is authenticated (simplified - in real app use proper auth check)
  const isAuthenticated = localStorage.getItem('quantumUser') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// AdminRoute component for admin-only routes
const AdminRoute = ({ children }) => {
  // Check if user is admin (simplified - in real app use proper role check)
  const user = JSON.parse(localStorage.getItem('quantumUser') || '{}');
  const isAdmin = user.role === 'admin';
  return isAdmin ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ChatProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* Main App Routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="chat/:lessonId?" element={<ChatPage />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Router>
        </ChatProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;