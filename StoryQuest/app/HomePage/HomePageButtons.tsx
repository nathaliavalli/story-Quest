"use client";

import React from "react";
import "./HomePageButtonStyles.css";
import Image from "next/image";
import useSound from "use-sound";
import useTextToSpeech from "@/Components/useTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";

/*Create room Button*/
export const CreateButton: React.FC = () => {
    const {speak} = useQuickTextToSpeech(); // useQuickTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        speak("");
        buttonHandler('pop', "Lets Create a Game!", speak);
    };

    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                src="/plus-icon.svg"
                alt="Creating a room icon"
                // This changes the width and height of the svg
                width={60}
                height={60}
            />
            </div>
            </div>
            <button className="button create-button" onClick={handleClick}>
            <span>Create</span>
        </button>
        </div>
    );
};

/*Join room Button*/
export const JoinButton: React.FC = () => {
    const {speak} = useQuickTextToSpeech(); // useQuickTextToSpeech hook
    const {buttonHandler} = useButtonFeedback();
    const handleClick = () => {
        speak("");
        buttonHandler('pop', "Please grab your tablet and follow the pictures on the screen to scan the QR code using the camera", speak);
    };
    return (
        <div className="button-with-attached-circle">
            <div className="button-circle">
                <div className="svg-icon">
                <Image
                    src="/Join-Room2.svg"
                    alt="qr join icon"
                    width={60}
                    height={55}
                />
            </div>
            </div>
            <button className="button join-button" onClick={handleClick}>
                <span>Join</span>
            </button>
        </div>
    );
};

interface ExitButtonProps {
  asLink?: boolean;
  href?: string;
  className?: string;
  testId?: string;
}

/*Back Button - Used on Create Room Page and join room page */export const ExitButton: React.FC<ExitButtonProps> = ({ asLink = false, href, className = '', testId = 'exit-button' }) => {
    const { speak } = useQuickTextToSpeech();
    const { buttonHandler, isSpeaking } = useButtonFeedback();
    
    const handleClick = (text: string) => {
        speak("");
        buttonHandler('back', text, speak);
        if (asLink && href) {
            window.location.href = href; // Programmatic navigation
        }
    };

    return (
        <button
            className={`button back-button ${className}`}
            onClick={() => handleClick("Exit")}
        >
            <div className="svg-icon">
                <Image
                    src="/back-icon.svg"
                    alt="back icon"
                    width={40}
                    height={40}
                    className="icon-spacing"
                />
            </div>
            <span>Exit</span>
        </button>
    );
};
