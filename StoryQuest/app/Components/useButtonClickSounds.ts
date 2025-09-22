// StoryQuest/app/Components/useButtonClickSounds.ts

"use client";
import useSound from "use-sound";
import {useState} from "react";

// Hook for interface button clicks and text to speech
// Uses mp3 for the click sound
// Allows for text to speech on passed text
const useButtonFeedback = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    // button sounds
    const [playCreate] = useSound('/sounds/createroom-click.mp3');
    const [playSelect] = useSound('/sounds/select-click.mp3');
    const [playBack] = useSound('/sounds/back-click.mp3');
    const [playPop] = useSound('/sounds/pop-click.mp3');
    const [playGameplay] = useSound('/sounds/gameplay-start.mp3');

    // button handler
    const buttonHandler = (
        soundType: 'none' |'create' | 'select' | 'back' | 'pop'| 'gameplay', // Button mp3 sounds
        text: string, // passed text
        speakFn: (text: string) => void // speak hook that was passed
    ) => {
        
        const soundMap = {
            none: () => {}, // no click sound
            create: playCreate,
            select: playSelect,
            back: playBack,
            pop: playPop,
            gameplay: playGameplay
        };
        
        // Play the button sound
        soundMap[soundType]();

        if (text) {
            setIsSpeaking(true);

            // Add a small delay to ensure sound effect plays before speech
            setTimeout(() => {
                try {
                    speakFn(text);

                    // Estimate speech duration more accurately
                    const minDuration = 1000; // Increased minimum duration
                    const charsPerSecond = 10; // Average speaking rate
                    const estimatedDuration = Math.max(
                        minDuration,
                        (text.length / charsPerSecond) * 1000
                    );

                    setTimeout(() => {
                        setIsSpeaking(false);
                    }, estimatedDuration);
                } catch (error) {
                    console.error("Speech synthesis error:", error);
                    setIsSpeaking(false);
                }
            }, 200); // Increased delay for more reliability
        }
    };

    return { buttonHandler, isSpeaking };
};

export default useButtonFeedback;