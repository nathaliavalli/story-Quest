import React, { useRef, useState, useEffect } from "react";

interface CameraProps {
  setHotspotImage: (imageData: string) => void;
}

const Camera: React.FC<CameraProps> = ({ setHotspotImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      try {
        const constraints = {
          video: { 
            facingMode: "environment",
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        };
        
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        setStream(newStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          await videoRef.current.play();
          setTimeout(() => startContinuousScan(), 1000);
        }
        
        setCameraError(null);
      } catch (err) {
        console.log("Back camera not available, trying front camera");
        const frontStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
        
        setStream(frontStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = frontStream;
          await videoRef.current.play();
          setTimeout(() => startContinuousScan(), 1000);
        }
        
        setCameraError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please make sure you've given camera permission.");
    }
  };

  const preprocessImageData = (imageData: ImageData): ImageData => {
    const data = imageData.data;
    
    const contrastFactor = 1.5;
    const brightnessFactor = 10;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      
      let adjusted = contrastFactor * (avg - 128) + 128 + brightnessFactor;
      adjusted = Math.max(0, Math.min(255, adjusted));
      
      data[i] = adjusted;
      data[i + 1] = adjusted;
      data[i + 2] = adjusted;
    }
    
    return imageData;
  };

  const captureAndScanFrame = () => {
    if (!videoRef.current || !canvasRef.current || !window.jsQR) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const processedImageData = preprocessImageData(imageData);
    ctx.putImageData(processedImageData, 0, 0);

    try {
      const code = window.jsQR(
        processedImageData.data,
        processedImageData.width,
        processedImageData.height,
        {
          inversionAttempts: "attemptBoth"
        }
      );

      if (code) {
        stopContinuousScan();
        const imageData = canvas.toDataURL("image/png");
        setHotspotImage(imageData);
        
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#00FF00";
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.lineTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.stroke();
      }
    } catch (error) {
      console.log("Error scanning QR code:", error);
    }
  };

  const startContinuousScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    scanIntervalRef.current = setInterval(captureAndScanFrame, 300);
  };

  const stopContinuousScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvasRef.current.toDataURL("image/png");
    setHotspotImage(imageData);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.async = true;
      script.onload = startCamera;
      document.body.appendChild(script);
    } else {
      startCamera();
    }
    
    return () => {
      stopContinuousScan();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col md:flex-row h-full w-full gap-2">

      <div className="relative w-full md:w-[70%] h-full min-h-[250px] bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef} 
          className="w-full h-full object-contain"
          playsInline 
          autoPlay
          muted
        />
        {/* QR code alignment guide */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-green-500 rounded-lg opacity-70">
            {isScanning && (
                <div className="absolute inset-0 border-2 border-yellow-500 animate-pulse rounded-lg"></div>
              )}
          </div>
        </div>
      </div>

      {/* Right Controls - takes remaining space */}
      <div className="w-full md:w-[25%] flex flex-col justify-center items-center gap-4 p-1">
        <canvas ref={canvasRef} style={{ display: "none" }} />
        
        <button
          onClick={captureImage}
          className="bg-green-600 text-white font-bold py-1 px-3 rounded-lg shadow-md hover:bg-green-700 text-xl w-full max-w-[200px]"
          disabled={!stream}
        >
          Capture
        </button>
        
        {cameraError && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {cameraError}
            <button 
              onClick={startCamera}
              className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-sm w-full"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;

declare global {
  interface Window {
    jsQR: (
      data: Uint8ClampedArray,
      width: number,
      height: number,
      options?: {
        inversionAttempts: "dontInvert" | "onlyInvert" | "attemptBoth";
      }
    ) => {
      data: string;
      location: {
        topLeftCorner: { x: number; y: number };
        topRightCorner: { x: number; y: number };
        bottomRightCorner: { x: number; y: number };
        bottomLeftCorner: { x: number; y: number };
      };
    } | null;
  }
}