---
sidebar_position: 5
---

# TextToSpeechAACButtons Component

**Description:**  
`TextToSpeechAACButtons`: This component provides basic text-to-speech functionality using the Web Speech API. It includes accessible Play and Stop buttons, allowing users to listen to the provided text. The component is optimized for AAC (Augmentative and Alternative Communication) scenarios and supports notification via a callback when speech ends.

## Props

- **`text` (required):**
    - Type: `string`
    - Description: The string to be read aloud via text-to-speech.

- **`onSpeechEnd` (optional):**
    - Type: `() => void`
    - Description: A callback function that is triggered when the speech ends.

## Behavior

- Initializes a `SpeechSynthesisUtterance` each time the `text` prop changes.
- Listens for `end` and `pause` events to manage playback state and trigger optional callbacks.
- Cleans up speech events and cancels playback when the component unmounts or when `text` updates.

## UI Elements

- **Play Button**
    - Starts or resumes speech playback.
    - Cancels any previously queued or ongoing speech before starting new playback.
    - Aria label dynamically updates to "Play speech" or "Resume speech" based on state.

- **Stop Button**
    - Cancels all speech and resets the state.
    - Disabled if there is no speech queued (`utterance` is null).

## Accessibility

- Buttons are labeled using `aria-label` attributes to support screen reader usage.
- Ensures speech state is accurately reflected through button states and interactivity.

## Usage Example

```tsx
import TextToSpeechAACButtons from './TextToSpeechAACButtons';

const Example = () => {
  const handleSpeechEnd = () => {
    console.log("Speech finished.");
  };

  return (
    <TextToSpeechAACButtons
      text="Welcome to the accessible text-to-speech demo."
      onSpeechEnd={handleSpeechEnd}
    />
  );
};
