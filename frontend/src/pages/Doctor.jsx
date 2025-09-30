import React, { useEffect, useState } from "react";
import api from "../api";
import '../App.css'; // Import the CSS file
import CaseTable from "../components/CaseTable";

export default function Doctor() {
  const [cases, setCases] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/studies/");
      setCases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Doctor Dashboard</h2>
      <CaseTable cases={cases} />
    </div>
  );
}
