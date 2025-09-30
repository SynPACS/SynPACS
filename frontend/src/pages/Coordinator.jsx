// import React, { useEffect, useState } from "react";
// import api from "../api";
// import CaseTable from "../components/CaseTable";

// export default function Coordinator() {
//   const [cases, setCases] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   const load = async () => {
//     try {
//       const res = await api.get("/studies/");
//       setCases(res.data);
//       const users = await api.get("/clients/"); // placeholder to get users -- ideally create endpoint to list doctors
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { load(); }, []);

//   const handleAssign = async (c) => {
//     const doctorId = prompt("Enter doctor user id to assign:");
//     if (!doctorId) return;
//     try {
//       const res = await api.post(`/studies/${c.id}/assign_doctor/`, { doctor_id: doctorId });
//       alert("Assigned");
//       load();
//     } catch (err) {
//       alert("Assign failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Coordinator Dashboard</h2>
//       <CaseTable cases={cases} showAssign onAssign={handleAssign} />
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import api from "../api";
// import CaseTable from "../components/CaseTable";

// export default function Coordinator() {
//   const [cases, setCases] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   const load = async () => {
//     try {
//       const res = await api.get("/studies/");
//       setCases(res.data);

//       const doctorsRes = await api.get("/doctors/");
//       setDoctors(doctorsRes.data); // list of doctors with {id, name}
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleAssign = async (c) => {
//     if (!doctors.length) return alert("No doctors available");

//     const doctorName = prompt(
//       `Enter doctor name:\n${doctors.map((d) => d.name).join("\n")}`
//     );
//     if (!doctorName) return;

//     const selectedDoctor = doctors.find((d) => d.name === doctorName);
//     if (!selectedDoctor) return alert("Doctor not found");

//     try {
//       await api.post(`/studies/${c.id}/assign_doctor/`, { doctor_id: selectedDoctor.id });
//       alert("Assigned successfully!");
//       load();
//     } catch (err) {
//       console.error(err);
//       alert("Assign failed");
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Coordinator Dashboard</h2>
//       <CaseTable cases={cases} showAssign onAssign={handleAssign} />
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../api";
// import CaseTable from "../components/CaseTable";

// export default function Coordinator() {
//   const [cases, setCases] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   const load = async () => {
//     try {
//       const res = await api.get("/studies/");
//       setCases(res.data);

//       const doctorsRes = await api.get("/doctors/");
//       setDoctors(doctorsRes.data); // [{id, name}]
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // const handleAssign = async (studyId, doctorId) => {
//   //   try {
//   //     await api.post(`/studies/${studyId}/assign_doctor/`, { doctor_id: doctorId });
//   //     alert("Assigned successfully!");
//   //     load();
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Assignment failed");
//   //   }
//   // };

//   const handleAssign = async (studyId, doctorId) => {
//     if (!doctorId) return;
//     try {
//       await api.post(
//         `/studies/${studyId}/assign_doctor/`,
//         { doctor_id: doctorId },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       alert("Doctor assigned successfully");
//       load();
//     } catch (err) {
//       alert("Failed to assign doctor");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Coordinator Dashboard</h2>
//       <CaseTable
//         cases={cases}
//         doctors={doctors}
//         showAssign
//         onAssign={handleAssign}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import api from "../api";
// import CaseTable from "../components/CaseTable";

// export default function Coordinator() {
//   const [cases, setCases] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   const loadCases = async () => {
//     try {
//       const res = await api.get("/studies/");
//       setCases(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadDoctors = async () => {
//     try {
//       const res = await api.get("/doctors/");
//       setDoctors(res.data); // expects [{"id":1,"name":"Dr. Aman"}]
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadCases();
//     loadDoctors();
//   }, []);

//   const handleAssign = async (studyId, doctorId) => {
//     if (!doctorId) return;
//     try {
//       await api.post(
//         `/studies/${studyId}/assign_doctor/`,
//         { doctor_id: doctorId },
//         { headers: { "Content-Type": "application/json" } } // fix 415
//       );
//       alert("Assigned successfully!");
//       loadCases();
//     } catch (err) {
//       console.error(err);
//       alert("Assign failed");
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>Coordinator Dashboard</h2>
//       <CaseTable
//         cases={cases}
//         doctors={doctors}
//         showAssign
//         onAssign={handleAssign}
//       />
//     </div>
//   );
// }


// Coordinator page with the same styling approach
import React, { useEffect, useState } from "react";
import api from "../api";
import '../App.css'; // Import the CSS file
import CaseTable from "../components/CaseTable";

export default function Coordinator() {
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const loadCases = async () => {
    try {
      const res = await api.get("/studies/");
      setCases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctors/");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCases();
    loadDoctors();
  }, []);

  const handleAssign = async (studyId, doctorId) => {
    if (!doctorId) return;
    try {
      await api.post(
        `/studies/${studyId}/assign_doctor/`,
        { doctor_id: doctorId },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Assigned successfully!");
      loadCases();
    } catch (err) {
      console.error(err);
      alert("Assign failed");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Coordinator Dashboard</h2>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>Case Management</h3>
        </div>
        <CaseTable
          cases={cases}
          doctors={doctors}
          showAssign
          onAssign={handleAssign}
        />
      </div>
    </div>
  );
}




