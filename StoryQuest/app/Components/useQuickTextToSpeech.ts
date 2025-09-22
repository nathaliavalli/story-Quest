// StoryQuest/app/Components/useQuickTextToSpeech.ts

import React, {useState, useEffect, useRef} from "react";

// Text to speech phrases hook, used for button or quick sounds
const useQuickTextToSpeech = () => {
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isReady, setIsReady] = useState(false);
    const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

    // voice selection for all platforms
    const selectVoice = (voices: SpeechSynthesisVoice[]) => {
        if (!voices || voices.length === 0) return null;

        // Priority voice list with platform-specific preferences
        const voicePriorityList = [
            // Android (Google voices)
            { name: "Google UK English Male", lang: "en-GB" },
            { name: "Google US English", lang: "en-US" },
            // Windows (Microsoft voices)
            { name: "Microsoft David", lang: "en-US" },
            { name: "Microsoft Zira", lang: "en-US" },
            // macOS (Apple voices)
            { name: "Daniel", lang: "en-GB" },
            { name: "Alex", lang: "en-US" },
            // Fallback English voices
            { name: "", lang: "en-US" },
            { name: "", lang: "en-GB" },
            // Ultimate fallback
            { name: "", lang: "" }
        ];

        for (const { name, lang } of voicePriorityList) {
            const voice = voices.find(v =>
                (name === "" || v.name.includes(name)) &&
                (lang === "" || v.lang.includes(lang))
            );
            if (voice) return voice;
        }

        return voices[0]; // Final fallback
    };

    // Initialize speech synthesis
    useEffect(() => {
        if (typeof window === "undefined" || !window.speechSynthesis) {
            console.warn("Speech synthesis not supported");
            return;
        }

        const synth = window.speechSynthesis;
        let initialized = false;

        const initializeSynth = () => {
            if (initialized) return;

            const voices = synth.getVoices();
            if (voices.length > 0) {
                const voice = selectVoice(voices);
                setSelectedVoice(voice);
                setIsReady(true);
                initialized = true;

                // iOS warm-up (silent utterance)
                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                    const warmUp = new SpeechSynthesisUtterance("");
                    warmUp.volume = 0;
                    synth.speak(warmUp);
                    setTimeout(() => synth.cancel(), 100);
                }
            }
        };

        // First try (voices might be ready)
        initializeSynth();

        // Fallback for Chrome Android which loads voices async
        synth.addEventListener("voiceschanged", initializeSynth);

        return () => {
            synth.removeEventListener("voiceschanged", initializeSynth);
            synth.cancel();
        };
    }, []); // closes the useEffect hook

    // Text to speech
    const speak = (text: string) => {
        if (!text || typeof window === "undefined" || !window.speechSynthesis || !selectedVoice) {
            return;
        }
        stop();

        const utterance = new SpeechSynthesisUtterance(text.replace(/_/g, " ")); // Create utterance
        utterance.voice = selectedVoice; // Set the selected voice

        // change settings if too fast or too slow
        // Platform-specific properties
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            // iOS settings
            utterance.rate = 1;
            utterance.volume = 1;
            utterance.pitch = 1;
        } else if (/Android/.test(navigator.userAgent)) {
            // Android settings
            utterance.rate = 1;
            utterance.volume = 1;
            utterance.pitch = 1;
        } else {
            // Desktop settings
            utterance.rate = 1;
            utterance.volume = 1;
            utterance.pitch = 1;
        }

        currentUtterance.current = utterance;

        utterance.onstart = () => {
            console.log("tts started:", text);
        };

        // onend event listener
        utterance.onend = () => {
            console.log("tts completed:", text);
            currentUtterance.current = null;
        };

        utterance.onerror = () => {
            console.log("tts error:", text);
        };

        window.speechSynthesis.speak(utterance); // Play speech
    };

    const stop = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            currentUtterance.current = null;
        }
    };

    return { speak, stop, isReady }; // return the speak function, used as a hook
};

export default useQuickTextToSpeech;