---
sidebar_position: 7
---

# `AnimatedTitle` Component
The `AnimatedTitle` component renders an animated, interactive "StoryQuest" title using CSS effects and controlled animation timing. It includes a wave animation that plays after an initial load delay, followed by a smooth stop to reduce motion sickness. 

## Key Features

- **Animated Title**: Letters of "StoryQuest" animate into view and wave briefly.
- **Accessible Interaction**: Clicking the title triggers auditory feedback using text-to-speech.

## Animation States

- `isLoaded`: Controls fade-in or entrance animation.
- `isWaving`: Triggers the waving CSS animation.
- `isStopping`: Manages the drop/stop effect after waving.

## State Variables

- `divRef`: Reference to the wrapping `<div>` for direct DOM access.
- `isLoaded`: Boolean indicating if the title has been loaded.
- `isWaving`: Boolean that enables wave animation.
- `isStopping`: Boolean for the stopping phase of the animation.

## Hooks Used

- `useEffect`: Handles staged animation triggers with timeouts.
- `useQuickTextToSpeech`: Custom hook to enable text-to-speech on title click.
- `useButtonFeedback`: Custom hook to provide button sound/feedback support.

## CSS Class Transitions

- `.animated-title`: Base class for styling
- `.loaded`: Applies when the title is rendered
- `.wave`: Adds wave animation class
- `.stopping`: Applies stop animation

## Accessibility

- `aria-label="StoryQuest"` for screen readers
- `aria-hidden="true"` on individual span letters
- Clickable div triggers TTS saying "StoryQuest"

## Usage Example

```tsx
import AnimatedTitle from './AnimatedTitle';

export default function HomePage() {
  return (
    <div>
      <AnimatedTitle />
    </div>
  );
}
```

## Dependencies

- `./AnimatedTitleStyles.css` (for animation styles)
- `useQuickTextToSpeech`
- `useButtonClickSounds`
