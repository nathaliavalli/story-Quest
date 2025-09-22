//StoryQuest/app/Components/TextToSpeechAACButtons.tsx

import React, { useState, useEffect, useRef } from "react";

interface TextToSpeechProps {
    text: string;
    disabled?: boolean;
    onSpeechEnd?: () => void; // Callback for when speech ends
}

const TextToSpeechAACButtons: React.FC<TextToSpeechProps> = ({ 
    text, 
    onSpeechEnd, 
    disabled 
}) => {
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);

        const handleEnd = () => {
            setIsPaused(false);
            onSpeechEnd?.(); // Notify parent when speech ends
        };

        u.addEventListener("end", handleEnd);
        utteranceRef.current = u;

        return () => {
            synth.cancel(); // Cancel any ongoing speech when the component unmounts or text changes
            u.removeEventListener("end", handleEnd);
        };
    }, [text, onSpeechEnd]); // Recreate utterance when text changes

    const handlePlay = () => {
        if (disabled) return;

        const synth = window.speechSynthesis;
        synth.cancel(); // Cancel any ongoing speech before starting a new one

        if (isPaused) {
            synth.resume(); // Resume if paused
        } else {
            synth.speak(utteranceRef.current!);
        }

        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause(); // Pause the speech
        setIsPaused(true);
    };

    const handleStop = () => {
        if (disabled) return; // NEW: Don't allow interaction when disabled
        window.speechSynthesis.cancel();
        setIsPaused(false);
    };

    return (
        <div className="flex gap-2 mt-1">
            <button
                onClick={handlePlay}
                disabled={disabled}
                className={`px-4 py-2 rounded text-white font-bold ${
                    disabled ? 'bg-gray-400 cursor-not-allowed' : 
                    'bg-green-500 hover:bg-green-600'
                }`}
            >
                {disabled ? 'Auto-Reading...' : '▶ Play'}
            </button>

            <button
                onClick={handleStop}
                disabled={disabled} // Disable if no utterance
                className={`px-4 py-2 rounded text-white font-bold ${
                    disabled ? 'bg-gray-400 cursor-not-allowed' : 
                    'bg-red-500 hover:bg-red-600'
                }`}
            >
                ⏹ Stop
            </button>
        </div>
    );
};

export default TextToSpeechAACButtons;