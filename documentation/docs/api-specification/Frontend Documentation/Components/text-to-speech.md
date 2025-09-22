---
sidebar_position: 4
---
#  Text-to-Speech Component

`TextToSpeechTextOnly.tsx`: This React component uses the browser's `speechSynthesis` API to read a given text aloud. It handles voice selection, retries on errors, and ensures compatibility across browsers, including mobile devices.

## Props

### `text`
- **Type:** `string`
- **Description:** The text that will be read aloud by the speech synthesis API. Any underscores (`_`) in the text are replaced with spaces before speaking.

### `onComplete` (Optional)
- **Type:** `() => void`
- **Description:** A callback function that is called when the speech has finished. This is useful for notifying parent components when the speech process is complete.

## State

- **`isReady`** (`boolean`): Indicates if the voices have been successfully loaded and are available for use in the speech synthesis API.

## Refs

- **`voicesLoadedRef`** (`boolean`): Tracks whether the voices have been loaded successfully. This prevents the component from trying to load voices multiple times.
- **`utteranceRef`** (`SpeechSynthesisUtterance | null`): Ref to the current `SpeechSynthesisUtterance` object, used to manage the speech synthesis instance.
- **`attemptCountRef`** (`number`): Keeps track of the number of retry attempts in case of errors during speech synthesis.
- **`maxAttempts`** (`number`): Defines the maximum number of retry attempts for speech synthesis errors (default is 5).

## Effects

### `useEffect` (Voice Initialization)
- **Description:**  
  Initializes the speech synthesis API and loads available voices. It listens for the `voiceschanged` event to confirm that voices are loaded. If the event isn't triggered (e.g., in Safari), a fallback timer attempts to continue.

- **Dependencies:** None (Runs once on mount)

- **Returns:**  
  Cleans up event listeners and cancels any ongoing speech when the component unmounts.

### `useEffect` (Speaking Text)
- **Description:**  
  Once the `text` and `isReady` state are available, it triggers the speech synthesis to speak the text. It manages retries on errors, handles mobile browser workarounds, and sets properties for the `SpeechSynthesisUtterance` (rate, pitch, volume).

- **Dependencies:** `text`, `isReady`, `onComplete`

- **Returns:**  
  Cancels any ongoing speech and clears the timer when the component unmounts.

## Functions

### `selectVoice`
- **Description:**  
  Selects the best available voice for speech synthesis based on predefined preferences or language. It checks for specific voice names (e.g., "Google UK English Male") and falls back to the first available voice if none match.

- **Returns:**  
  The selected `SpeechSynthesisVoice` object, or `null` if no voices are available.

### `speakText`
- **Description:**  
  Creates a new `SpeechSynthesisUtterance` object with the given text and sets properties such as `rate`, `pitch`, and `volume`. It attempts to speak the text and retries up to a maximum number of attempts if an error occurs.

## Example Usage

```tsx
import React, { useState } from 'react';
import TextToSpeechTextOnly from './TextToSpeechTextOnly';

const StoryPage: React.FC = () => {
  const [isSpeechComplete, setIsSpeechComplete] = useState(false);
  const text = "Once upon a time, there was a princess.";

  const handleSpeechComplete = () => {
    setIsSpeechComplete(true);
    console.log("Speech completed successfully.");
  };

  return (
    <div>
      <TextToSpeechTextOnly text={text} onComplete={handleSpeechComplete} />
      {isSpeechComplete && <p>The story has been read aloud.</p>}
    </div>
  );
};
```