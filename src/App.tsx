import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import BrowseIdeas from './pages/BrowseIdeas';
import SavedHustles from './pages/SavedHustles';
import Tools from './pages/Tools';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const handleAuthSuccess = () => {
    console.log('Authentication successful');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SideHive Kenya
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto">
              Discover profitable side hustles tailored for aspiring Kenyan entrepreneurs. Start your journey with minimal capital.
            </p>
            <div className="max-w-md mx-auto">
              <AuthForm onSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/browse" element={<BrowseIdeas />} />
          <Route path="/saved" element={<SavedHustles />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 