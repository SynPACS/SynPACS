// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CaseTable({ cases, doctors = [], showAssign = false, onAssign }) {
//   const navigate = useNavigate();
//   const [selectedDoctor, setSelectedDoctor] = useState({}); // store per-case selection

//   return (
//     <table border="1" cellPadding="6">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Patient</th>
//           <th>Modality</th>
//           <th>Study Date</th>
//           <th>Assigned Doctor</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cases.map((c) => (
//           <tr key={c.id}>
//             <td>{c.id}</td>
//             <td>{c.patient_name} ({c.patient_id})</td>
//             <td>{c.modality}</td>
//             <td>{c.study_date}</td>
//             <td>{c.assigned_doctor_name || "-"}</td>
//             <td>
//               <button onClick={() => navigate(`/viewer/${c.id}`)}>Viewer</button>
//               {showAssign && (
//                 <>
//                   <select
//                     value={selectedDoctor[c.id] || ""}
//                     onChange={(e) =>
//                       setSelectedDoctor({
//                         ...selectedDoctor,
//                         [c.id]: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="">Select Doctor</option>
//                     {doctors.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.name}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={() => onAssign(c.id, selectedDoctor[c.id])}
//                   >
//                     Assign
//                   </button>
//                 </>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'; // Import the CSS file

export default function CaseTable({ cases, doctors = [], showAssign = false, onAssign }) {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState({});

  return (
    <div className="healthcare-table-container">
      <table className="healthcare-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Modality</th>
            <th>Study Date</th>
            <th>Assigned Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <div className="patient-info">
                  <div className="patient-name">{c.patient_name}</div>
                  <div className="patient-id">({c.patient_id})</div>
                </div>
              </td>
              <td>{c.modality}</td>
              <td>{c.study_date}</td>
              <td>
                <div className="doctor-assignment">
                  {c.assigned_doctor_name || (
                    <span className="unassigned">Unassigned</span>
                  )}
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate(`/viewer/${c.id}`)}
                  >
                    View Study
                  </button>
                  {showAssign && (
                    <div className="assign-section">
                      <select
                        value={selectedDoctor[c.id] || ""}
                        onChange={(e) =>
                          setSelectedDoctor({
                            ...selectedDoctor,
                            [c.id]: e.target.value,
                          })
                        }
                        className="doctor-select"
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn-secondary"
                        onClick={() => onAssign(c.id, selectedDoctor[c.id])}
                        disabled={!selectedDoctor[c.id]}
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
