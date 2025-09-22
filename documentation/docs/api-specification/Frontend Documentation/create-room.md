---
sidebar_position: 2
---

# `CreateRoomPage`
The `CreateRoomPage` component is a multi-step interactive UI that allows users to create a new game room. Users can select a story, specify the number of players, choose a difficulty level, and finalize their settings before generating a game room and a corresponding QR code for others to join.

## Component Structure

### `CreateRoomPage`
- Main exported component rendered via the `Next.js` app directory.
- Handles the full room creation flow including state management, Firebase interaction, and navigation.

## Steps

1. **Choose Your Story**: Select from a predefined set of stories (Garden Adventure, Walk in the Forest, Space Adventure, Under the Sea).
2. **Choose Number of Players**: Select between 2 to 4 players.
3. **Pick Game Difficulty**: Select a difficulty (easy, medium, hard).
4. **Review and Start**: Review selections and create the game room.

## State Variables

- `currentStep`: Current step in the 4-step flow.
- `selectedStory`: Chosen story title.
- `numPlayers`: Number of players selected.
- `difficultyLevel`: Chosen game difficulty.
- `loading`: Indicates if room creation is in progress.
- `roomId`: Generated Firebase room ID.
- `tooltip`: Tooltip text shown on hover (descriptive info for difficulty).

## Hooks Used

- **`useRouter()`**: Used for redirecting to the QR code page after room creation.
- **`useQuickTextToSpeech()`**: Custom hook for reading out button labels for accessibility.
- **`useButtonFeedback()`**: Custom hook to provide auditory feedback and interaction sounds.

## Firebase Integration

- **`addDoc(collection(db, "rooms"), {...})`**: Creates a new room document.
- **`setDoc(doc(db, "games", roomId), {...})`**: Sets up the game state document.

## Navigation

On successful room creation, users are redirected to:

```
/CreateRoom/qrcode?roomId={roomId}&storyTitle={selectedStory}
```

## Accessibility

- All user interaction points provide auditory feedback using TTS.
- Button hover and click events trigger appropriate spoken messages and sound cues.

## Visual Elements

- Fullscreen responsive layout with background image.
- Styled buttons with hover and active states.
- Progress indicators and back buttons for navigation.

## Dependencies

- `firebase/firestore`
- `next/navigation`
- Custom components:
    - `ExitButton`
    - `useQuickTextToSpeech`
    - `useButtonClickSounds`

