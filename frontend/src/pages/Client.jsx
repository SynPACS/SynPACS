// // src/pages/Client.js
// import React, { useEffect, useState } from "react";
// import UploadDicom from "../components/UploadDicom";
// import CaseTable from "../components/CaseTable";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Client() {
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const load = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/studies/");
//       setCases(res.data);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) {
//         navigate('/login');
//       } else {
//         setError("Failed to load cases: " + (err.response?.data?.detail || err.message));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   if (loading) return <div>Loading cases...</div>;
  
//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Client Dashboard</h2>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       <UploadDicom onUploaded={load} />
//       <h3>Your Cases</h3>
//       <CaseTable cases={cases} />
//     </div>
//   );
// }


// src/pages/Client.js
import React, { useEffect, useState } from "react";
import UploadDicom from "../components/UploadDicom";
import CaseTable from "../components/CaseTable";
import api from "../api";
import '../App.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";

export default function Client() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/studies/");
      setCases(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError("Failed to load cases: " + (err.response?.data?.detail || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return (
    <div className="page-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading cases...</p>
      </div>
    </div>
  );
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Client Dashboard</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="card">
        <UploadDicom onUploaded={load} />
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>Your Cases</h3>
        </div>
        <CaseTable cases={cases} />
      </div>
    </div>
  );
}