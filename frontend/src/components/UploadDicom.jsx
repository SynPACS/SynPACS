// // src/components/UploadDicom.jsx
// import React, { useState } from "react";
// import api from "../api";

// const UploadDicom = ({ onUploaded }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setMessage("Please select a DICOM file first!");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("dicom_file", selectedFile);

//     try {
//       // Directly upload the file (JWT headers already included in api)
//       const response = await api.post("/studies/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setMessage("File uploaded successfully!");
      
//       // Trigger parent refresh callback if provided
//       if (onUploaded) onUploaded();

//       // Reset selected file
//       setSelectedFile(null);

//     } catch (error) {
//       console.error("Upload error:", error);
//       if (error.response) {
//         setMessage(
//           `Upload failed: ${error.response.status} - ${JSON.stringify(
//             error.response.data
//           )}`
//         );
//       } else if (error.request) {
//         setMessage("Upload failed: No response from server");
//       } else {
//         setMessage(`Upload failed: ${error.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <h3>Upload DICOM File</h3>
//       <input
//         type="file"
//         accept=".dcm,.dicom"
//         onChange={handleFileChange}
//         disabled={isLoading}
//       />
//       <button
//         onClick={handleUpload}
//         disabled={isLoading || !selectedFile}
//         style={{ marginLeft: "10px" }}
//       >
//         {isLoading ? "Uploading..." : "Upload"}
//       </button>

//       {message && (
//         <div
//           style={{
//             marginTop: "10px",
//             color: message.includes("success") ? "green" : "red",
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadDicom;



// src/components/UploadDicom.jsx
import React, { useState } from "react";
import api from "../api";

import '../App.css'; // Import the CSS file

const UploadDicom = ({ onUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a DICOM file first!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("dicom_file", selectedFile);

    try {
      const response = await api.post("/studies/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded successfully!");
      
      if (onUploaded) onUploaded();
      setSelectedFile(null);

    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        setMessage(
          `Upload failed: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        setMessage("Upload failed: No response from server");
      } else {
        setMessage(`Upload failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload DICOM File</h3>
      <div className="upload-controls">
        <div className="file-input-wrapper">
          <label className="file-input-label">
            {selectedFile ? selectedFile.name : "Choose DICOM file"}
            <input
              type="file"
              accept=".dcm,.dicom"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>
        </div>
        <button
          className={`btn-primary ${isLoading ? 'loading' : ''}`}
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes("success") ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadDicom;



