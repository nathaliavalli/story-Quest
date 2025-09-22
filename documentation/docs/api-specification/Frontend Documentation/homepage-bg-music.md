---
sidebar_position: 8
---

# `HomePageBackgroundMusic` Component
The `HomePageBackgroundMusic` component provides background music playback functionality on the homepage. It includes a music icon button that expands into audio controls for playing, stopping, and adjusting the volume.

## Key Features

- Clickable music icon toggles control visibility
- Play and stop buttons with accessible icons
- Volume slider to adjust background music volume
- Uses HTML5 `<audio>` element with persistent loop

## State Variables

- `isPlaying`: Indicates whether the music is currently playing
- `showControls`: Toggles display of play/stop and slider controls
- `volume`: Controls the playback volume (0–100)

## Hooks Used

- `useQuickTextToSpeech`: Custom hook to announce actions via TTS
- `useButtonFeedback`: Custom hook for sound and feedback on interaction

## Methods

### `handlePlayMusic`
- Plays the audio file and sets `isPlaying` to `true`
- Handles autoplay permission errors gracefully

### `handleStopMusic`
- Pauses and resets the audio, setting `isPlaying` to `false`

### `handleVolumeChange`
- Updates the volume state and applies volume to the HTML audio element

### `handleClick`
- Invokes `buttonHandler` and `speak` with descriptive text

## Audio Element

```html
<audio id="HomePageBackgroundMusic" loop>
  <source src="/sounds/StoryQuestHomePageMusic.mp3" type="audio/mp3"/>
</audio>
```

## Usage Example

```tsx
import { HomePageBackgroundMusic } from './HomePageBackgroundMusic';

export default function Home() {
  return (
    <div>
      <HomePageBackgroundMusic />
    </div>
  );
}
```

## Dependencies

- `./MusicSliderStyling.css` (for volume control styling)
- `next/image`
- `useQuickTextToSpeech`
- `useButtonClickSounds`

