
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface VideoUploadProps {
  videoUrl: string;
  onUploadComplete: (imageUrl: string) => void;
  onTriggerUpload: (triggerUpload: () => void) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ videoUrl, onUploadComplete, onTriggerUpload }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Function to capture a screenshot from the video and upload it
  const triggerUpload = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame to the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a base64 image
    const screenshotPath = canvas.toDataURL('image/png');

    // Convert the base64 image to a Blob and upload it
    const blob = base64ToBlob(screenshotPath, 'image/png');
    uploadToCloudinary(blob);
  };

  // Convert base64 to Blob
  const base64ToBlob = (base64Data: string, contentType = ''): Blob => {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  // Upload the image Blob to Cloudinary
  const uploadToCloudinary = (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'ml_default');

    axios
      .post('https://api.cloudinary.com/v1_1/dkw58uqns/image/upload', formData)
      .then((response) => {
        const secureUrl = response.data.secure_url;
        setUploadedImage(secureUrl);
        onUploadComplete(secureUrl); // Notify parent component with the URL
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  // Expose the triggerUpload function to the parent
  useEffect(() => {
    onTriggerUpload(triggerUpload);
  }, [onTriggerUpload]);

  // Automatically trigger the upload when the video is loaded
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
      videoRef.current.onloadeddata = triggerUpload;
    }
  }, [videoUrl]);

  return (
    <div>
      <h2>Video Upload and Screenshot</h2>
      <div>
        <video ref={videoRef} width="250" height="250" loop autoPlay muted>
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {uploadedImage && (
          <div className="w-28 h-28">
            <h3>Uploaded Screenshot (Cloudinary)</h3>
            <img src={uploadedImage} alt="Uploaded Screenshot" />
            <p>{uploadedImage}</p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};
