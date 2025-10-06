import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Import the main component from artifact
import UnifiedEducationInterface from './components/UnifiedEducationInterface';
import Login from './components/Auth/Login';

function App() {
  const { currentUser } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for prototype

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
          } 
        />
        <Route 
          path="/*" 
          element={
            isAuthenticated ? 
            <UnifiedEducationInterface /> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;