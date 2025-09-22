---
sidebar_position: 3
---
#  Completed Story Text-to-Speech Component

`CompletedStory.tsx`: This React component handles the reading of a completed story in a text-to-speech (TTS) format. It reads individual phrases and, once all phrases are read, switches to reading the full story. The component interacts with Firebase to update the game state once the story is fully read.

## Props

### `index`
- **Type:** `number`
- **Description:** The current index of the phrase being read. This should indicate the position of the phrase in the `completedPhrases` array. If `index` equals `completedPhrases.length - 1`, the story is considered complete.

### `completedPhrases`
- **Type:** `string[]`
- **Description:** An array of phrases that have been completed in the game. These phrases are read one by one, followed by a full-story read.

### `onComplete`
- **Type:** `() => void`
- **Description:** A function that is called when the story has finished being read, both individually and as a full story. This callback is used to notify the parent component that the TTS process is done.

### `roomId`
- **Type:** `string`
- **Description:** The unique identifier for the game room. This is used to update the game state in Firestore when the TTS process is completed.

## State

- **`currentIndex`** (`number`): Tracks the index of the current phrase being read from `completedPhrases`.
- **`finalRead`** (`boolean`): Indicates whether the component is in the final full-story reading mode.

## Effects

### `useEffect`
- **Description:**  
  Resets the `currentIndex` to 0 when the last phrase (`isLastPhrase`) is reached, signaling the completion of the game.

    - **Dependencies:** `isLastPhrase`

## Functions

### `handlePhraseComplete`
- **Description:**  
  Handles the completion of a phrase. It manages two modes:
    - **Individual Phrase Reading:** Continues reading the next phrase.
    - **Final Full-Story Reading:** When all phrases are read, it updates Firestore to mark the TTS process as completed (`ttsDone: true`) and calls the `onComplete` function after a delay.

- **Details:**
    - If the game is not finished, it continues to the next phrase.
    - If the game is finished, it switches to full-story reading and then updates Firestore.

### `textToSpeak`
- **Description:**  
  Decides which text should be read aloud based on the `finalRead` state. If in the `finalRead` mode, it concatenates all phrases into one continuous string.

## Rendering

- The component will render nothing unless the game is complete (`isLastPhrase` is `true`).
- It renders a `TextToSpeechTextOnly` component, which handles the actual text-to-speech functionality.
    - **Key Prop:** The `key` is set dynamically based on whether it is the final read or not (`key={finalRead ? "final" : currentIndex}`).

## Example Usage

```tsx
import React, { useState } from 'react';
import CompletedStory from './CompletedStory';

const GamePage: React.FC = () => {
  const [isTTSComplete, setIsTTSComplete] = useState(false);
  const completedPhrases = ["Once upon a time...", "There was a princess...", "And they lived happily ever after."];
  const roomId = "12345";

  const handleTTSComplete = () => {
    setIsTTSComplete(true);
    console.log("Text-to-speech reading complete.");
  };

  return (
    <div>
      <CompletedStory
        index={completedPhrases.length - 1}
        completedPhrases={completedPhrases}
        onComplete={handleTTSComplete}
        roomId={roomId}
      />
      {isTTSComplete && <p>The story has been fully read.</p>}
    </div>
  );
};
```