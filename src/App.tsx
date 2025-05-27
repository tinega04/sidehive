import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BrowseIdeas from './pages/BrowseIdeas';
import SavedHustles from './pages/SavedHustles';
import Tools from './pages/Tools';
import { BusinessDashboard } from './pages/business/[slug]';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/AuthForm';
import UserProfile from './components/settings/UserProfile';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/browse" element={<BrowseIdeas />} />
            <Route path="/saved" element={<SavedHustles />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/business/:slug" element={<BusinessDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App; 