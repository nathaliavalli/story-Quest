---
sidebar_position: 1
---

# AACKeyboard Component
The `AACKeyboard` component renders a customizable, interactive AAC (Augmentative and Alternative Communication) keyboard with a set of buttons representing words and corresponding symbols. This component is built using React and integrates motion animations via `framer-motion` to enhance the user experience.

## Props

- **`onSelect` (required):**
    - Type: `(word: string) => void`
    - Description: A callback function that is triggered when a user selects a word. The selected word is passed as a string argument.

- **`symbols` (required):**
    - Type: `{ word: string; image: string }[]`
    - Description: An array of objects representing the symbols on the keyboard. Each object should contain:
        - `word` (string): The word to be displayed on the button.
        - `image` (string): The URL to the image representing the symbol for that word.

- **`backgroundColor` (optional):**
    - Type: `string`
    - Default: `#b4fcdc`
    - Description: The background color for the AAC keyboard container. Accepts any valid CSS color value.

- **`buttonColor` (optional):**
    - Type: `string`
    - Default: `#63d2cb`
    - Description: The background color for the individual buttons. Accepts any valid CSS color value.

- **`blockButtons` (optional):**
    - Type: `boolean`
    - Default: `false`
    - Description: If `true`, the buttons are visually disabled, and an overlay is shown to indicate that the buttons cannot be interacted with.

## Usage Example

```tsx
import AACKeyboard from './AACKeyboard';

const symbols = [
  { word: 'Hello', image: '/path/to/hello.png' },
  { word: 'Goodbye', image: '/path/to/goodbye.png' },
  // More symbols...
];

const handleWordSelect = (word: string) => {
  console.log(`Selected word: ${word}`);
};

<AACKeyboard 
  onSelect={handleWordSelect} 
  symbols={symbols} 
  backgroundColor="#fff" 
  buttonColor="#4caf50" 
  blockButtons={false}
/>
```