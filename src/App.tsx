import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BrowseIdeas from './pages/BrowseIdeas';
import SavedHustles from './pages/SavedHustles';
import Tools from './pages/Tools';
import { BusinessDashboard } from './pages/business/[slug]';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/AuthForm';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/browse" element={<BrowseIdeas />} />
          <Route path="/saved" element={<SavedHustles />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/business/:slug" element={<BusinessDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 