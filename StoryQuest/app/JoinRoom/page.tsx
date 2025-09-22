//project-aac-game-team-b/StoryQuest/app/JoinRoom/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseControls/firebaseConfig";
import "../CreateRoom/CreateRoomButtonStyles.css";
import { ExitButton } from "../HomePage/HomePageButtons";
import useSound from "use-sound";
import Camera from "../Components/Camera";
import jsQR from "jsqr";
import Image from "next/image";
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

// Define props interface for the popup component
interface QRScanFailedPopupProps {
    onClose: () => void;
  }
  
  // QR Scan Failed Popup Component with proper TypeScript types
  const QRScanFailedPopup: React.FC<QRScanFailedPopupProps> = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-xl text-gray-700 font-bold text-center mb-4">Need help scanning?</h3>
          
          <div className="flex justify-center mb-4">
            <Image 
              src="/QR3.png"
              alt="QR Code Scanning Assistance"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              Please follow the picture and hold the camera in veiw of the QR Code
            </p>
            <button
              onClick={onClose}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-full transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  };

export default function JoinRoomPage() {
    const [roomId, setRoomId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [showFailedPopup, setShowFailedPopup] = useState(false);

    const joinRoomClick = "/sounds/joinroom-click.mp3";
    const [playJoinRoomClick] = useSound(joinRoomClick);

    const handleCapturedImage = (imageData: string) => {
        // Prevent multiple processing attempts simultaneously
        if (isProcessing) return;

        setIsProcessing(true);

        // Add a short delay to ensure camera is stabilized
        setTimeout(() => {
            processQRCode(imageData);
            setIsProcessing(false);
        }, 300); // 300ms delay
    };

    const processQRCode = (imageData: string) => {
        // Use HTMLImageElement constructor explicitly to avoid conflicts with Next.js Image
        const img = new window.Image();
        img.onload = () => {
            // Create a canvas for the image
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Set dimensions for the canvas
            canvas.width = img.width;
            canvas.height = img.height;

            //image enhancement
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Attempt to decode the QR code
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height,
                    {
                        inversionAttempts: "dontInvert"
                    }
                );

                if (code) {
                    // Successfully found QR code
                    setRoomId(code.data);
                    handleJoinRoom(code.data);
                    // Reset failed attempts on success
                    setFailedAttempts(0);
                } else {
                    // Increment failed attempts counter
                    const newFailedAttempts = failedAttempts + 1;
                    setFailedAttempts(newFailedAttempts);
                    
                    setErrorMessage("No QR code detected. Please position the code clearly and try again.");
                    
                    // Show popup after 3 failed attempts
                    if (newFailedAttempts >= 3) {
                        setShowFailedPopup(true);
                    }
                }
            } catch (err) {
                // Increment failed attempts counter
                const newFailedAttempts = failedAttempts + 1;
                setFailedAttempts(newFailedAttempts);
                
                console.error("Error processing QR code:", err);
                setErrorMessage("Error processing QR code. Please try again.");
                
                // Show popup after 3 failed attempts
                if (newFailedAttempts >= 8) {
                    setShowFailedPopup(true);
                }
            }
        };

        img.onerror = () => {
            setErrorMessage("Error loading captured image. Please try again.");
            setIsProcessing(false);
            
            // Increment failed attempts counter
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            
            // Show popup after 3 failed attempts
            if (newFailedAttempts >= 3) {
                setShowFailedPopup(true);
            }
        };

        img.src = imageData;
    };

    const handleJoinRoom = async (scannedRoomId: string) => {
        if (!scannedRoomId) {
            setErrorMessage("No room ID detected.");
            return;
        }

        try {
            // The scanned URL might be the full URL instead of just the room ID
            // Extract just the room ID from the URL if needed
            let roomIdToCheck = scannedRoomId;

            // Check if the scanned value is a URL (from your QR code)
            if (scannedRoomId.startsWith("http")) {
                // Parse the URL to extract the roomId
                const urlParts = scannedRoomId.split('/');
                // The roomId should be the second-to-last segment in your URL structure
                // /Gameplay/roomId/storyTitle
                roomIdToCheck = urlParts[urlParts.length - 2];
            }

            console.log("Checking room ID:", roomIdToCheck);

            // Now check if this room exists in Firebase
            const roomRef = doc(db, "rooms", roomIdToCheck);
            const roomDoc = await getDoc(roomRef);

            if (roomDoc.exists()) {
                playJoinRoomClick();

                // Extract storyTitle if it's in the URL
                let storyTitle = "";
                if (scannedRoomId.startsWith("http")) {
                    const urlParts = scannedRoomId.split('/');
                    storyTitle = urlParts[urlParts.length - 1];
                }

                // Navigate to the gameplay page with the extracted roomId and storyTitle
                window.location.href = `/Gameplay/${roomIdToCheck}/${storyTitle}`;
            } else {
                setErrorMessage("Room not found. Please check the QR code and try again.");
                
                // Increment failed attempts counter
                const newFailedAttempts = failedAttempts + 1;
                setFailedAttempts(newFailedAttempts);
                
                // Show popup after 3 failed attempts
                if (newFailedAttempts >= 10) {
                    setShowFailedPopup(true);
                }
            }
        } catch (error) {
            console.error("Error joining room:", error);
            setErrorMessage("Error joining room. Please try again.");
            
            // Increment failed attempts counter
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            
            // Show popup after 3 failed attempts
            if (newFailedAttempts >= 10) {
                setShowFailedPopup(true);
            }
        }
    };

    const closeFailedPopup = () => {
        setShowFailedPopup(false);
        setFailedAttempts(0); // Reset failed attempts when closing popup
    };

    const {speak} = useQuickTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const handleClick = (text:string) => {
        buttonHandler('none', text, speak);
        console.log("click");
    };

    return (
        <div className="h-screen w-screen fixed inset-0 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/images/home-background.jpg')" }}>
            
            <div className="h-full w-full p-4 flex justify-center items-center overflow-y-auto">
                <div className="max-w-[1024px] w-full flex flex-col gap-4 h-full max-h-full relative">
                    
                    {/* Exit Button - Top Left */}
                    <Link href="/" className="absolute top-0 left-0 z-10 scale-50">
                        <ExitButton />
                    </Link>

                {/* QR Instructions Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border-2 border-teal-300 p-4 shrink-0 pt-12" onClick={()=> handleClick("How to join with QR code:, 1. Find the picture, 2. Scan the picture, 3. Play together, 4. Enjoy")}>
                    <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        GRAB A TABLET AND FOLLOW THE PICTURES BELLOW
                    </h2>
                    
                    <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="items-center">
                                <Image 
                                    src={`/diagrams/QR${step}.png`}
                                    alt={`Step ${step}`}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                    priority
                                />
                                <p className="text-md text-gray-600 text-center">
                                    {step === 1 && "Point the camera"}
                                    {step === 2 && "Find this picture"}
                                    {step === 3 && "Wait for scan"}
                                    {step === 4 && "Play together"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Camera Section - Modified for better responsiveness */}
               <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border-2 border-teal-300 p-4 w-full flex-1 min-h-[300px] flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 text-center" onClick={()=>handleClick("Scan Below")}>
                        Scan Below
                    </h2>
                    
                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <div className="w-full h-full max-w-[900px] mx-auto">
                        <Camera setHotspotImage={handleCapturedImage} />
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                <div className="shrink-0 min-h-[40px] flex flex-col justify-center">
                    {errorMessage && (
                        <p className="text-red-500 my-1 text-center text-base">
                            {errorMessage}
                        </p>
                    )}
                    {isProcessing && (
                        <p className="text-white my-1 text-center text-base">
                            Processing QR code...
                        </p>
                    )}
                </div>
            </div>
        </div>
        
        {/* Failed QR Scan Popup */}
        {showFailedPopup && <QRScanFailedPopup onClose={closeFailedPopup} />}
    </div>
);
}