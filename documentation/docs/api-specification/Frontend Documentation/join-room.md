---
sidebar_position: 3
---

# `JoinRoomPage` 
The `JoinRoomPage` component enables users to join an existing StoryQuest game session by scanning a QR code using their device camera. It provides user-friendly feedback, error handling, and a popup guide when scanning fails repeatedly.

## Key Features

- Live camera integration for QR code scanning
- Parses QR code to extract `roomId` and `storyTitle`
- Automatically redirects users to the gameplay room
- Provides auditory and visual feedback using custom hooks
- Displays a helpful popup after failed attempts

## State Variables

| Variable           | Type       | Description                                                                 |
|--------------------|------------|-----------------------------------------------------------------------------|
| `roomId`           | `string`   | Stores the decoded room ID from the QR code                                |
| `errorMessage`     | `string`   | Displays any error messages to the user                                    |
| `isProcessing`     | `boolean`  | Prevents concurrent processing of QR codes                                 |
| `failedAttempts`   | `number`   | Tracks how many failed QR scans have occurred                              |
| `showFailedPopup`  | `boolean`  | Controls display of the instructional QR popup                             |

## Methods

### `handleCapturedImage(imageData: string)`
Processes image data captured from the camera and attempts to extract a QR code using `jsQR`.

### `processQRCode(imageData: string)`
Handles canvas creation, image drawing, QR decoding, and routing logic.

### `handleJoinRoom(scannedRoomId: string)`
Checks if the room exists in Firebase and redirects to the gameplay route if valid.

### `closeFailedPopup()`
Resets `failedAttempts` and hides the QR help popup.

## Hooks Used

- `useQuickTextToSpeech`: Announces instructions and feedback
- `useButtonFeedback`: Plays sounds and handles button interaction feedback
- `useSound`: Used to play a sound effect when joining a room

## Components Used

- `<Camera />`: Custom camera feed and snapshot capture component
- `<ExitButton />`: Exit/back button from homepage
- `<QRScanFailedPopup />`: Custom modal that shows guidance after repeated failed scans

## Accessibility

- Instructions are provided using text-to-speech on button click
- High-contrast and large visual instructions
- Clear error messaging and retry prompts

## Example QR Code Format

```text
https://project-aac-game-team-b--storyquest-fcdc2.us-central1.hosted.app/Gameplay/ROOM_ID/STORY_TITLE
```

## Usage Example

```tsx
import JoinRoomPage from './JoinRoom/page';

export default function App() {
  return <JoinRoomPage />;
}
```

## Dependencies

- `firebase/firestore`
- `jsQR`
- `next/image`, `next/link`
- Custom components:
    - `Camera`
    - `ExitButton`
- Custom hooks:
    - `useQuickTextToSpeech`
    - `useButtonClickSounds`
