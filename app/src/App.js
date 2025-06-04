import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Importar páginas al inicio 👇
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateList from './pages/CreateList';
import MyLists from './pages/MyLists';
import Settings from './pages/Settings';

// Context de autenticación
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí iría la lógica de Firebase para verificar si hay usuario
    const checkAuth = async () => {
      // Simulamos una verificación
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Aquí iría la lógica de Firebase
    setUser({ email, name: 'Usuario Demo' });
    return true;
  };

  const logout = async () => {
    // Aquí iría la lógica de Firebase
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-list" element={
              <ProtectedRoute>
                <CreateList />
              </ProtectedRoute>
            } />
            <Route path="/my-lists" element={
              <ProtectedRoute>
                <MyLists />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}