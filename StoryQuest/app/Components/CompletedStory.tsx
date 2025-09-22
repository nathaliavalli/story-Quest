//StoryQuest/app/Components/CompletedStory.tsx
import React, { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebaseControls/firebaseConfig";

interface TextToSpeechCompletedStoryProps {
  completedPhrases: string[];
  onComplete: () => void;
  roomId: string;
}

const CompletedStory: React.FC<TextToSpeechCompletedStoryProps> = ({
  completedPhrases,
  onComplete,
  roomId,
}) => {
  useEffect(() => {
    const narrationDelay = 1500; // 1.5 second delay before starting
    const postNarrationDelay = 500; // 0.5 second delay after finishing

    const fullStory = [...completedPhrases, "The End!"].join(". "); // Proper punctuation
    
    const timer = setTimeout(async () => {
      const utterance = new SpeechSynthesisUtterance(fullStory);
      
      utterance.onend = async () => {
        await updateDoc(doc(db, "games", roomId), { ttsDone: true });
        setTimeout(onComplete, postNarrationDelay);
      };

      window.speechSynthesis.speak(utterance);
    }, narrationDelay);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [completedPhrases, roomId, onComplete]);

  return null; // No visual component needed
};

export default CompletedStory;