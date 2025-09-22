//StoryQuest/app/Components/TextToSpeechTextOnly.tsx

import React, { useEffect, useState, useRef } from "react";

interface TextToSpeechCompletedStoryProps {
  text: string;
  onComplete?: () => void;
}

const TextToSpeechTextOnly: React.FC<TextToSpeechCompletedStoryProps> = ({
  text,
  onComplete,
}) => {
  const [isReady, setIsReady] = useState(false);
  const voicesLoadedRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const attemptCountRef = useRef(0);
  const maxAttempts = 5;

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
    const safariFallbackTimer = setTimeout(() => {
      if (!voicesLoadedRef.current) {
        console.warn("Voice loading timed out, trying to proceed anyway");
        setIsReady(true);
      }
    }, 1000);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      clearTimeout(safariFallbackTimer);
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
      "Alex", // Good for Safari allegedly 
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

  // Speak the text when ready
  useEffect(() => {
    if (!text || !isReady) return;

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
          console.log("Speech ended successfully");
          utteranceRef.current = null;
          onComplete?.();
        };

        utterance.onerror = (e) => {
          console.warn("Speech synthesis error:", e);
          utteranceRef.current = null;
          
          // Retry on error for mobile browsers
          if (attemptCountRef.current < maxAttempts) {
            attemptCountRef.current++;
            setTimeout(speakText, 250);
          } else {
            // After max attempts, just call onComplete
            onComplete?.();
          }
        };

        // Workaround for some mobile browsers
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
      } catch (err) {
        console.error("Speech synthesis exception:", err);
        onComplete?.();
      }
    };

    // Start speaking with a small delay to help with mobile browsers
    const timer = setTimeout(speakText, 200);
    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, isReady, onComplete]);

  return null;
};

export default TextToSpeechTextOnly;