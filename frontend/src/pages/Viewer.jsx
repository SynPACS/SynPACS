// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";

// import cornerstone from "cornerstone-core";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// // Configure loader
// cornerstoneWADOImageLoader.configure({
//   useWebWorkers: true,
// });

// export default function Viewer() {
//   const { id } = useParams();
//   const elementRef = useRef(null);
//   const [dicomUrl, setDicomUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [frame, setFrame] = useState(0);
//   const [totalFrames, setTotalFrames] = useState(1);

//   useEffect(() => {
//     const loadAndDisplay = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(`/studies/${id}/`);
//         const url = res.data.dicom_url;
//         setDicomUrl(url);

//         if (!url) throw new Error("No DICOM URL available");

//         const element = elementRef.current;
//         cornerstone.enable(element);

//         // Fetch DICOM as blob
//         const dicomRes = await fetch(url);
//         const dicomBlob = await dicomRes.blob();
//         const dicomArrayBuffer = await dicomBlob.arrayBuffer();

//         // Load file using file manager
//         const file = new File([dicomArrayBuffer], "study.dcm");
//         const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

//         const image = await cornerstone.loadAndCacheImage(imageId);
//         cornerstone.displayImage(element, image);

//         // Handle multi-frame
//         const numFrames = image.data ? image.data.length : 1;
//         setTotalFrames(numFrames);

//         // If multi-frame, allow scrolling through frames with arrow keys
//         const onKeyDown = (e) => {
//           if (numFrames <= 1) return;
//           let newFrame = frame;
//           if (e.key === "ArrowRight") newFrame = Math.min(frame + 1, numFrames - 1);
//           if (e.key === "ArrowLeft") newFrame = Math.max(frame - 1, 0);
//           if (newFrame !== frame) {
//             cornerstone.loadAndCacheImage(imageId, newFrame).then((img) => {
//               cornerstone.displayImage(element, img);
//               setFrame(newFrame);
//             });
//           }
//         };
//         window.addEventListener("keydown", onKeyDown);

//         // Cleanup
//         return () => {
//           window.removeEventListener("keydown", onKeyDown);
//           cornerstone.disable(element);
//         };
//       } catch (err) {
//         console.error("Viewer error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Store current ref to use in cleanup safely
//     const cleanupPromise = loadAndDisplay();
//     return () => {
//       cleanupPromise.then((cleanup) => {
//         if (cleanup) cleanup();
//       });
//     };
//   }, [id, frame]);

//   return (
//     <div style={{ padding: 12 }}>
//       <h3>Viewer (Study ID: {id})</h3>
//       {loading && <p>Loading DICOM...</p>}
//       {dicomUrl && !loading && <p>Loaded from: {dicomUrl}</p>}
//       {totalFrames > 1 && !loading && (
//         <p>
//           Frame: {frame + 1} / {totalFrames} (Use Left/Right arrows to scroll)
//         </p>
//       )}
//       <div
//         ref={elementRef}
//         style={{ width: "512px", height: "512px", background: "black" }}
//       ></div>
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import '../App.css'; // Import the CSS file

import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

export default function Viewer() {
  const { id } = useParams();
  const elementRef = useRef(null);
  const enabledElementRef = useRef(null);
  const [dicomUrl, setDicomUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frame, setFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(1);

  // useEffect(() => {
  //   let keyListener = null;

  //   const loadAndDisplay = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get(`/studies/${id}/`);
  //       const url = res.data.dicom_url;
  //       if (!url) throw new Error("No DICOM URL available");
  //       setDicomUrl(url);

  //       const element = elementRef.current;
  //       cornerstone.enable(element);
  //       enabledElementRef.current = element;

  //       // Fetch DICOM as blob
  //       const dicomRes = await fetch(url);
  //       const dicomBlob = await dicomRes.blob();
  //       const dicomArrayBuffer = await dicomBlob.arrayBuffer();
  //       const file = new File([dicomArrayBuffer], "study.dcm");

  //       const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
  //       const image = await cornerstone.loadAndCacheImage(imageId);
  //       cornerstone.displayImage(element, image);

  //       const numFrames = image.data?.numberOfFrames || 1;
  //       setTotalFrames(numFrames);

  //       if (numFrames > 1) {
  //         keyListener = async (e) => {
  //           let newFrame = frame;
  //           if (e.key === "ArrowRight") newFrame = Math.min(frame + 1, numFrames - 1);
  //           if (e.key === "ArrowLeft") newFrame = Math.max(frame - 1, 0);
  //           if (newFrame !== frame) {
  //             const frameId = `${imageId}?frame=${newFrame}`;
  //             const img = await cornerstone.loadAndCacheImage(frameId);
  //             cornerstone.displayImage(element, img);
  //             setFrame(newFrame);
  //           }
  //         };
  //         window.addEventListener("keydown", keyListener);
  //       }
  //     } catch (err) {
  //       console.error("Viewer error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadAndDisplay();

  //   return () => {
  //     if (enabledElementRef.current) {
  //       try {
  //         cornerstone.disable(enabledElementRef.current);
  //         enabledElementRef.current = null;
  //       } catch (err) {
  //         console.warn("Error disabling element:", err);
  //       }
  //     }
  //     if (keyListener) window.removeEventListener("keydown", keyListener);
  //   };
  // }, [id]); // only id, not frame

  useEffect(() => {
    let isMounted = true;
    let keyListener = null;
    let enabledElement = null;
  
    const loadAndDisplay = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/studies/${id}/`);
        const url = res.data.dicom_url;
        if (!url) throw new Error("No DICOM URL available");
        setDicomUrl(url);
  
        const element = elementRef.current;
        if (!element) return;
  
        cornerstone.enable(element);
        enabledElement = element;
  
        const dicomRes = await fetch(url);
        const dicomBlob = await dicomRes.blob();
        const dicomArrayBuffer = await dicomBlob.arrayBuffer();
        const file = new File([dicomArrayBuffer], "study.dcm");
  
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        const image = await cornerstone.loadAndCacheImage(imageId);
        cornerstone.displayImage(element, image);
  
        const numFrames = image.data?.numberOfFrames || 1;
        if (isMounted) setTotalFrames(numFrames);
  
        if (numFrames > 1) {
          keyListener = async (e) => {
            if (!isMounted) return;
            let newFrame = frame;
            if (e.key === "ArrowRight") newFrame = Math.min(frame + 1, numFrames - 1);
            if (e.key === "ArrowLeft") newFrame = Math.max(frame - 1, 0);
            if (newFrame !== frame) {
              const frameId = `${imageId}?frame=${newFrame}`;
              const img = await cornerstone.loadAndCacheImage(frameId);
              cornerstone.displayImage(element, img);
              setFrame(newFrame);
            }
          };
          window.addEventListener("keydown", keyListener);
        }
      } catch (err) {
        console.error("Viewer error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    loadAndDisplay();
  
    return () => {
      isMounted = false;
      if (keyListener) window.removeEventListener("keydown", keyListener);
  
      // Only disable if element still exists in the DOM
      if (enabledElement && document.body.contains(enabledElement)) {
        try {
          cornerstone.disable(enabledElement);
        } catch (err) {
          console.warn("Error disabling element:", err);
        }
      }
    };
  }, [id]); // frame removed from dependency


  return (
    <div style={{ padding: 12 }}>
      <h3>Viewer (Study ID: {id})</h3>
      {loading && <p>Loading DICOM...</p>}
      {dicomUrl && !loading && <p>Loaded from: {dicomUrl}</p>}
      {totalFrames > 1 && !loading && (
        <p>
          Frame: {frame + 1} / {totalFrames} (Use Left/Right arrows to scroll)
        </p>
      )}
      <div
        ref={elementRef}
        style={{ width: "512px", height: "512px", background: "black" }}
      ></div>
    </div>
  );
}
