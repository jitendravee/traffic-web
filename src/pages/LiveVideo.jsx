// // // // import React, { useEffect, useRef, useState } from "react";

// // // // const VideoStream = () => {
// // // //   const videoRef = useRef(null);
// // // //   const [isLive, setIsLive] = useState(true); // State to toggle between live camera and recorded video
// // // //   const [socket, setSocket] = useState(null); // Store WebSocket connection
// // // //   const [mediaStream, setMediaStream] = useState(null); // Store webcam media stream

// // // //   // Create WebSocket connection on component mount
// // // //   useEffect(() => {
// // // //     const newSocket = new WebSocket("ws://localhost:3000");
// // // //     newSocket.onopen = () => {
// // // //       console.log("WebSocket connected");
// // // //     };

// // // //     newSocket.onmessage = (event) => {
// // // //       console.log("Received message from server:", event.data);
// // // //     };

// // // //     newSocket.onerror = (error) => {
// // // //       console.error("WebSocket error:", error);
// // // //     };

// // // //     newSocket.onclose = () => {
// // // //       console.log("WebSocket connection closed");
// // // //     };

// // // //     setSocket(newSocket);

// // // //     // Cleanup WebSocket on component unmount
// // // //     return () => {
// // // //       newSocket.close();
// // // //     };
// // // //   }, []);

// // // //   // Stream webcam video to WebSocket server
// // // //   const startCameraStream = async () => {
// // // //     try {
// // // //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// // // //       setMediaStream(stream);

// // // //       // Show webcam video in the video tag
// // // //       if (videoRef.current) {
// // // //         videoRef.current.srcObject = stream;
// // // //         videoRef.current.play();
// // // //       }

// // // //       // Send webcam frames to WebSocket
// // // //       if (socket) {
// // // //         const mediaRecorder = new MediaRecorder(stream);
// // // //         mediaRecorder.ondataavailable = (event) => {
// // // //           socket.send(event.data);
// // // //         };
// // // //         mediaRecorder.start(100); // Send data every 100ms
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error accessing webcam: ", err);
// // // //     }
// // // //   };

// // // //   // Stop webcam stream
// // // //   const stopCameraStream = () => {
// // // //     if (mediaStream) {
// // // //       mediaStream.getTracks().forEach((track) => track.stop());
// // // //       setMediaStream(null);
// // // //     }
// // // //   };

// // // //   // Switch to live camera stream
// // // //   const handleLiveStream = () => {
// // // //     setIsLive(true);
// // // //     stopCameraStream(); // Stop the previous recorded video stream
// // // //     startCameraStream(); // Start the live webcam stream
// // // //   };

// // // //   // Switch to recorded video playback
// // // //   const handleRecordedStream = () => {
// // // //     setIsLive(false);
// // // //     stopCameraStream(); // Stop the webcam stream
// // // //   };

// // // //   // Initialize HLS.js to play recorded video from the server (HLS stream)
// // // //   useEffect(() => {
// // // //     if (!isLive) {
// // // //       const Hls = require("hls.js");
// // // //       if (Hls.isSupported()) {
// // // //         const hls = new Hls();
// // // //         hls.loadSource("http://localhost:3000/live");
// // // //         hls.attachMedia(videoRef.current);
// // // //         hls.on(Hls.Events.MANIFEST_PARSED, () => {
// // // //           console.log("HLS manifest parsed");
// // // //         });
// // // //       }
// // // //     }
// // // //   }, [isLive]);

// // // //   return (
// // // //     <div>
// // // //       <h2>{isLive ? "Live Video Stream" : "Recorded Video Stream"}</h2>

// // // //       {/* UI Controls for toggling between Live and Recorded */}
// // // //       <div>
// // // //         <button onClick={handleLiveStream}>Live Camera</button>
// // // //         <button onClick={handleRecordedStream}>Recorded Video</button>
// // // //       </div>

// // // //       {/* Video player to display live webcam or recorded video */}
// // // //       <video ref={videoRef} controls autoPlay muted width="100%" />

// // // //       {/* If we are using recorded video, provide option to upload or select a video */}
// // // //       {!isLive && (
// // // //         <div>
// // // //           <input
// // // //             type="file"
// // // //             accept="video/*"
// // // //             onChange={(e) => {
// // // //               const file = e.target.files[0];
// // // //               if (file) {
// // // //                 const videoURL = URL.createObjectURL(file);
// // // //                 videoRef.current.src = videoURL;
// // // //               }
// // // //             }}
// // // //           />
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default VideoStream;
// // // import React, { useEffect, useRef, useState } from "react";
// // // import Hls from "hls.js";
// // // import io from "socket.io-client"
// // // const VideoStream = () => {
// // //   const videoRef = useRef(null);
// // //   const [isLive, setIsLive] = useState(true); // State to toggle between live camera and recorded video
// // //   const [socket, setSocket] = useState(null); // Store WebSocket connection
// // //   const [mediaStream, setMediaStream] = useState(null); // Store webcam media stream

// // //   // Create WebSocket connection on component mount
// // //   useEffect(() => {
// // //     const newSocket = io("ws://localhost:3000");
    
// // //     newSocket.onopen = () => {
// // //       console.log("WebSocket connected");
// // //     };

// // //     newSocket.onmessage = (event) => {
// // //       console.log("Received message from server:", event.data);
// // //     };

// // //     newSocket.onerror = (error) => {
// // //       console.error("WebSocket error:", error);
// // //     };

// // //     newSocket.onclose = () => {
// // //       console.log("WebSocket connection closed");
// // //     };

// // //     setSocket(newSocket);

// // //     // Cleanup WebSocket on component unmount
// // //     return () => {
// // //       newSocket.close();
// // //     };
// // //   }, []);

// // //   // Stream webcam video to WebSocket server
// // //   const startCameraStream = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// // //       setMediaStream(stream);

// // //       // Show webcam video in the video tag
// // //       if (videoRef.current) {
// // //         videoRef.current.srcObject = stream;
// // //         videoRef.current.play();
// // //       }

// // //       // Send webcam frames to WebSocket
// // //       if (socket) {
// // //         const mediaRecorder = new MediaRecorder(stream);
// // //         mediaRecorder.ondataavailable = (event) => {
// // //           console.log("Sending binary stream to WebSocket");
// // //           socket.send(event.data);
// // //         };
// // //         mediaRecorder.start(100); // Send data every 100ms
// // //       }
// // //     } catch (err) {
// // //       console.error("Error accessing webcam: ", err);
// // //     }
// // //   };

// // //   // Stop webcam stream
// // //   const stopCameraStream = () => {
// // //     if (mediaStream) {
// // //       mediaStream.getTracks().forEach((track) => track.stop());
// // //       setMediaStream(null);
// // //     }
// // //   };

// // //   // Switch to live camera stream
// // //   const handleLiveStream = () => {
// // //     setIsLive(true);
// // //     stopCameraStream(); // Stop the previous recorded video stream
// // //     startCameraStream(); // Start the live webcam stream
// // //   };

// // //   // Switch to recorded video playback
// // //   const handleRecordedStream = () => {
// // //     setIsLive(false);
// // //     stopCameraStream(); // Stop the webcam stream
// // //   };

// // //   // Initialize HLS.js to play recorded video from the server (HLS stream)
// // //   useEffect(() => {
// // //     if (!isLive) {
// // //       if (Hls.isSupported()) {
// // //         const hls = new Hls();
// // //         hls.loadSource("http://localhost:3000/live");
// // //         hls.attachMedia(videoRef.current);
// // //         hls.on(Hls.Events.MANIFEST_PARSED, () => {
// // //           console.log("HLS manifest parsed");
// // //         });
// // //       }
// // //     }
// // //   }, [isLive]);

// // //   return (
// // //     <div>
// // //       <h2>{isLive ? "Live Video Stream" : "Recorded Video Stream"}</h2>

// // //       {/* UI Controls for toggling between Live and Recorded */}
// // //       <div>
// // //         <button onClick={handleLiveStream}>Live Camera</button>
// // //         <button onClick={handleRecordedStream}>Recorded Video</button>
// // //       </div>

// // //       {/* Video player to display live webcam or recorded video */}
// // //       <video ref={videoRef} controls autoPlay muted width="100%" />

// // //       {/* If we are using recorded video, provide option to upload or select a video */}
// // //       {!isLive && (
// // //         <div>
// // //           <input
// // //             type="file"
// // //             accept="video/*"
// // //             onChange={(e) => {
// // //               const file = e.target.files[0];
// // //               if (file) {
// // //                 const videoURL = URL.createObjectURL(file);
// // //                 videoRef.current.src = videoURL;
// // //               }
// // //             }}
// // //           />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default VideoStream;

// // // App.js
// // import React, { useState, useRef } from 'react';
// // import io from 'socket.io-client';

// // const socket = io('http://localhost:3000'); // Connect to backend WebSocket

// // function VideoStream() {
// //   const [hlsUrl, setHlsUrl] = useState('');
// //   const [isStreaming, setIsStreaming] = useState(false);
// //   const fileInputRef = useRef(null);

// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Create a FileReader to read the file as binary
// //     const reader = new FileReader();
// //     reader.onload = (event) => {
// //       const binaryData = event.target.result;
// //       socket.emit('binarystream', binaryData);
  
// //       // Add a delay to allow the backend to generate the playlist
// //       setTimeout(() => {
// //           setHlsUrl('http://localhost:3000/live'); // Backend HLS endpoint
// //           setIsStreaming(true);
// //       }, 2000); // Adjust delay as needed
// //   };
  
// //     reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
// //   };

// //   const handleStartStream = () => {
// //     fileInputRef.current.click(); // Trigger file input click
// //   };

// //   return (
// //     <div className="App">
// //       <h1>Live Streaming from Video Upload</h1>
// //       <button onClick={handleStartStream}>Upload and Start Stream</button>
// //       <input
// //         type="file"
// //         accept="video/*"
// //         ref={fileInputRef}
// //         style={{ display: 'none' }}
// //         onChange={handleFileUpload}
// //       />

// //       {isStreaming && hlsUrl && (
// //         <div>
// //           <h2>Live Stream</h2>
// //           <video
// //             controls
// //             autoPlay
// //             style={{ width: '100%', maxWidth: '800px' }}
// //           >
// //             <source src={hlsUrl} type="application/x-mpegURL" />
// //             Your browser does not support HLS playback.
// //           </video>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default VideoStream;

// import React, { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';
// import Hls from 'hls.js';

// const socket = io('http://localhost:3000'); // Connect to backend WebSocket

// function VideoStream() {
//     const [hlsUrl, setHlsUrl] = useState('');
//     const [isStreaming, setIsStreaming] = useState(false);
//     const videoRef = useRef(null);
//     const fileInputRef = useRef(null);

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const binaryData = event.target.result;
//             socket.emit('binarystream', binaryData);

//             // Poll until playlist.m3u8 is ready
//             const checkPlaylist = async () => {
//                 try {
//                     const response = await fetch('http://localhost:3000/live');
//                     if (response.ok) {
//                         setHlsUrl('http://localhost:3000/live');
//                         setIsStreaming(true);
//                     } else {
//                         setTimeout(checkPlaylist, 500); // Retry after 500ms
//                     }
//                 } catch {
//                     setTimeout(checkPlaylist, 500); // Retry after 500ms
//                 }
//             };

//             checkPlaylist();
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     const handleStartStream = () => {
//         fileInputRef.current.click(); // Trigger file input click
//     };

//     useEffect(() => {
//         if (hlsUrl && videoRef.current) {
//             if (Hls.isSupported()) {
//                 const hls = new Hls();
//                 hls.loadSource(hlsUrl);
//                 hls.attachMedia(videoRef.current);
//             } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
//                 videoRef.current.src = hlsUrl;
//             }
//         }
//     }, [hlsUrl]);

//     return (
//         <div className="App">
//             <h1>Live Streaming from Video Upload</h1>
//             <button onClick={handleStartStream}>Upload and Start Stream</button>
//             <input
//                 type="file"
//                 accept="video/*"
//                 ref={fileInputRef}
//                 style={{ display: 'none' }}
//                 onChange={handleFileUpload}
//             />

//             {isStreaming && hlsUrl && (
//                 <div>
//                     <h2>Live Stream</h2>
//                     <video
//                         ref={videoRef}
//                         controls
//                         autoPlay
//                         style={{ width: '100%', maxWidth: '800px' }}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default VideoStream;
import React, { useState } from "react";
import axios from "axios";
import Hls from "hls.js";

const VideoStream = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [hlsUrl, setHlsUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Handle video file selection
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Simulate uploading the video in chunks
  const uploadVideoInChunks = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    const chunkSize = 1000000; // 1MB per chunk (can adjust)
    const totalChunks = Math.ceil(videoFile.size / chunkSize);

    const formData = new FormData();
    let currentChunk = 0;

    // Use a FileReader to read the video file in chunks
    const reader = new FileReader();

    reader.onload = async () => {
      // Convert ArrayBuffer to Blob
      const chunkBlob = new Blob([reader.result], { type: "video/webm" });
    
      // Add the chunk (now a Blob) to the FormData
      formData.append("video", chunkBlob, `chunk_${currentChunk}.webm`);
    
      try {
        // Upload the chunk
        const response = await axios.post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
          },
        });
    
        // Check if this was the last chunk
        if (currentChunk === totalChunks - 1) {
          setUploading(false);
          setHlsUrl(response.data.hlsUrl);
        } else {
          // Prepare the next chunk
          currentChunk += 1;
          formData.delete("video"); // Clear the form data before adding the next chunk
          readNextChunk();
        }
      } catch (err) {
        setError("Error uploading video chunk.");
        setUploading(false);
      }
    };
    

    const readNextChunk = () => {
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, videoFile.size);
      reader.readAsArrayBuffer(videoFile.slice(start, end));
    };

    // Start uploading the first chunk
    readNextChunk();
  };

  // Handle video player display
  const handleHlsPlayback = () => {
    const video = document.getElementById("videoPlayer");
    if (Hls.isSupported() && hlsUrl) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else {
      video.src = hlsUrl;
      video.play();
    }
  };

  return (
    <div>
      <h1>Upload Video as Live Stream</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={uploadVideoInChunks} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {progress > 0 && <div>Upload Progress: {progress}%</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      
      {hlsUrl && (
        <>
          <h2>HLS Stream</h2>
          <video id="videoPlayer" controls></video>
          <button onClick={handleHlsPlayback}>Play HLS Stream</button>
        </>
      )}
    </div>
  );
};

export default VideoStream;
