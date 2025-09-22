// StoryQuest/app/Components/useTextToSpeech.ts

import React, { useState, useEffect, useRef } from "react";

// Improved Text to speech phrases hook
const useTextToSpeech = () => {
    const [isReady, setIsReady] = useState(false);
    const voicesLoadedRef = useRef(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const attemptCountRef = useRef(0);
    const maxAttempts = 3;
    
    // Initialize speech synthesis
    useEffect(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            console.warn("Speech synthesis not supported");
            return;
        }

        const handleVoicesChanged = () => {
            if (voicesLoadedRef.current) return;
            voicesLoadedRef.current = true;
            setIsReady(true);
        };

        // Try getting voices immediately
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
            voicesLoadedRef.current = true;
            setIsReady(true);
        } else {
            // Wait for voices to load
            window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
        }

        // For Safari, which might not trigger voiceschanged
        const fallbackTimer = setTimeout(() => {
            if (!voicesLoadedRef.current) {
                console.warn("Voice loading timed out, trying to proceed anyway");
                setIsReady(true);
            }
        }, 1000);

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            clearTimeout(fallbackTimer);
            if (utteranceRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Select best available voice for the platform
    const selectVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // Try to find a voice by name or language
        const preferredVoiceNames = [
            "Google UK English Male",
            "Microsoft David",
            "Daniel",
            "Alex", // Good for Safari
        ];

        // Try by name first
        for (const name of preferredVoiceNames) {
            const voice = voices.find(v => v.name.includes(name));
            if (voice) return voice;
        }

        // Then try to find any English voice
        const englishVoice = voices.find(v => v.lang.includes('en'));
        if (englishVoice) return englishVoice;

        // Fall back to the first voice
        return voices[0];
    };

    // Speak function with retry mechanism
    const speak = (text: string) => {
        if (!text || !isReady) {
            console.warn("Not ready to speak yet");
            return;
        }
        
        attemptCountRef.current = 0;
        
        const speakText = () => {
            if (typeof window === 'undefined' || !window.speechSynthesis) return;

            try {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();

                // Create utterance
                const utterance = new SpeechSynthesisUtterance(text.replace(/_/g, " "));
                utteranceRef.current = utterance;

                // Select voice
                const voice = selectVoice();
                if (voice) {
                    utterance.voice = voice;
                }

                // Set properties
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;

                // Set callbacks
                utterance.onend = () => {
                    console.log("Button speech ended successfully:", text);
                    utteranceRef.current = null;
                };

                utterance.onerror = (e) => {
                    console.warn("Button speech error:", e, text);
                    utteranceRef.current = null;
                    
                    // Retry on error for mobile browsers
                    if (attemptCountRef.current < maxAttempts) {
                        attemptCountRef.current++;
                        setTimeout(speakText, 250);
                    }
                };

                // Workaround for some mobile browsers
                setTimeout(() => {
                    window.speechSynthesis.speak(utterance);
                }, 100);
            } catch (err) {
                console.error("Speech synthesis exception:", err);
            }
        };

        // Start speaking with a slightly longer delay to help with mobile browsers
        setTimeout(speakText, 300);
    };

    const stop = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            utteranceRef.current = null;
        }
    };

    return { speak, stop, isReady };
};

export default useTextToSpeech;