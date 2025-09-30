// Remove the unused import and variables
// src/App.js (updated)
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Client from "./pages/Client";
import LandingPage from "./pages/LandingPage";
import Coordinator from "./pages/Coordinator";
import Doctor from "./pages/Doctor";
import Viewer from "./pages/Viewer";
import api from './api'; // make sure this points to your api.js
// Remove the unused api import since we're using fetch directly
// import api from "./api";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setUserInfo(null);
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/pacs/me/");  // <-- use axios api
        setUserInfo(response.data);
      } catch (error) {
        console.log("Not authenticated", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
          path="/login" 
          element={
            userInfo ? 
            <Navigate to={userInfo.redirect_to} replace /> : 
            <Login setUserInfo={setUserInfo} />
          } 
        />
        <Route 
          path="/client" 
          element={
            userInfo && userInfo.groups && userInfo.groups.includes("client") ? 
            <Client /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/coordinator" 
          element={
            userInfo && userInfo.groups && userInfo.groups.includes("coordinator") ? 
            <Coordinator /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/doctor" 
          element={
            userInfo && userInfo.groups && userInfo.groups.includes("doctor") ? 
            <Doctor /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/viewer/:id" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;