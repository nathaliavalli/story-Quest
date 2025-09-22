---
sidebar_position: 6
---

# Hooks 

## `useButtonFeedback` Hook

The `useButtonFeedback` hook is designed to provide feedback for button interactions in the form of sounds and text-to-speech. It supports custom MP3 sounds for various button actions and provides functionality for speaking text when a button is clicked.

### Usage

This hook is ideal for improving accessibility and user interaction by adding auditory feedback to button presses and reading out text passed to the function.

#### Example Usage

```tsx
import React from 'react';
import useButtonFeedback from './useButtonFeedback';

const MyComponent: React.FC = () => {
  const { buttonHandler, isSpeaking } = useButtonFeedback();

  const handleClick = () => {
    buttonHandler(
      'select', 
      'You have selected this option.', 
      (text) => console.log(text) // Example speech function (you would replace this with actual text-to-speech logic)
    );
  };

  return (
    <button onClick={handleClick} disabled={isSpeaking}>
      Click Me
    </button>
  );
};
```
## `useAACSounds` Hook

The `useAACSounds` hook is designed to manage and play AAC keyboard button sounds for various words. It uses the `use-sound` library to play MP3 files for each corresponding word, with customizable volume control.

### Usage

This hook provides a function to play sounds associated with predefined words (e.g., "apples", "airplane", "alien"). Each word has an associated MP3 file, and the hook makes it easy to trigger the sound when a specific word is selected.

#### Example Usage

```tsx
import React from 'react';
import useAACSounds from './useAACSounds';

const AACKeyboard: React.FC = () => {
  const { playSound } = useAACSounds();

  const handleButtonClick = (word: string) => {
    playSound(word);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('apples')}>Apples</button>
      <button onClick={() => handleButtonClick('airplane')}>Airplane</button>
      <button onClick={() => handleButtonClick('alien')}>Alien</button>
      {/* Add more buttons for other words */}
    </div>
  );
};
```
## `useQuickTextToSpeech` Hook

The `useQuickTextToSpeech` hook provides functionality for text-to-speech (TTS), allowing you to speak text aloud with configurable voices and platform-specific settings. It also supports stopping ongoing speech and selecting voices based on priority for various platforms.

### Usage

This hook is ideal for adding voice feedback in web applications, ensuring accessibility and improving user experience with dynamic, platform-specific TTS features.

#### Example Usage

```tsx
import React, { useEffect } from 'react';
import useQuickTextToSpeech from './useQuickTextToSpeech';

const MyComponent: React.FC = () => {
  const { speak, stop, isReady } = useQuickTextToSpeech();

  useEffect(() => {
    if (isReady) {
      speak('Hello, welcome to the site!');
    }
  }, [isReady, speak]);

  const handleStop = () => {
    stop();
  };

  return (
    <div>
      <button onClick={handleStop}>Stop Speech</button>
    </div>
  );
};
```
## `useTextToSpeech` Hook

The `useTextToSpeech` hook provides advanced functionality for text-to-speech (TTS) synthesis in React applications. It includes features such as selecting an optimal voice for the platform, retry mechanisms for mobile browsers, and the ability to speak and stop speech dynamically.

### Usage

This hook is ideal for adding TTS features with voice selection and retry mechanisms for mobile compatibility. It can be used to provide dynamic, voice-based feedback in web applications.

#### Example Usage

```tsx
import React, { useEffect } from 'react';
import useTextToSpeech from './useTextToSpeech';

const MyComponent: React.FC = () => {
  const { speak, stop, isReady } = useTextToSpeech();

  useEffect(() => {
    if (isReady) {
      speak('Welcome to the site!');
    }
  }, [isReady, speak]);

  const handleStop = () => {
    stop();
  };

  return (
    <div>
      <button onClick={handleStop}>Stop Speech</button>
    </div>
  );
};
```