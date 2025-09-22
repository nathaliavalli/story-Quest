//project-aac-game-team-b/StoryQuest/app/CreateRoom/qrcode/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Suspense } from "react";
import "../CreateRoomButtonStyles.css";
import Image from 'next/image';
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";
import { ExitButton } from "@/HomePage/HomePageButtons";
import Link from "next/link";

function QRCodeContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId"); // Get room ID from URL
    const storyTitle = searchParams.get("storyTitle"); //Get story title from URL

    if (!roomId) {
        return <p>Error: No room ID found.</p>;
    }

    const joinRoomUrl = `https://project-aac-game-team-b--storyquest-fcdc2.us-central1.hosted.app/Gameplay/${roomId}/${storyTitle}`;
    //const joinRoomUrl = `/Gameplay/${roomId}/${storyTitle}`;


    const {speak} = useQuickTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const handleClick = (text:string) => {
        buttonHandler('none', text, speak);
    };


    return (
        <div 
            className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: "url('/images/home-background.jpg')" }}
        >
            {/* Single Semi-Transparent Container */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-teal-300 p-1 w-full max-w-6xl h-[85vh] overflow-hidden">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 text-center" onClick={()=>handleClick("Scan to Join Room")}>
                    Scan to Join Room
                </h1>
                 <div className="absolute bottom-40">            
                    <Link href="/" className="absolute top-4 left-4 z-10 scale-50">
                        <ExitButton />
                    </Link>
                </div>

                {/* Steps */}
                <div className="scale-75">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-teal-300 p-1" onClick={()=> handleClick("How to join with QR code:, 1. Find the picture, 2. Scan the picture, 3. Play together, 4. Enjoy")}>
                    <h2 className="text-md font-semibold text-gray-700 text-center">
                        How to join with QR code:
                    </h2>
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="items-center">
                                <Image 
                                    src={`/diagrams/QR${step}.png`}
                                    alt={`Step ${step}`}
                                    width={120}
                                    height={120}
                                    className="rounded-lg"
                                    priority
                                />
                                <p className="text-md text-gray-600 text-center">
                                    {step === 1 && "1. Find code"}
                                    {step === 2 && "2. Scan code"}
                                    {step === 3 && "3. Play together"}
                                    {step === 4 && "4. Enjoy"}
                                </p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center">
                    <div className=" mt-5 scale-125 p-2 bg-white rounded-xl shadow-inner border-4 border-teal-300">
                        <QRCode 
                        value={joinRoomUrl} 
                        size={220} 
                        ecLevel="H" 
                        eyeRadius={5}
                        />
                    </div>
                </div>
                <p className="text-xl text-gray-700 text-center m-10" onClick={()=>handleClick("Share this QR code with friends to join the game!")}>
                    Share this QR code with friends to join the game!
                </p>
            </div>
        </div>
    );
}

export default function QRCodePage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <QRCodeContent />
        </Suspense>
    );
} 