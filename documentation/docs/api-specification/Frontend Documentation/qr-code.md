---
sidebar_position: 6
---

# `QRCodePage` Component
The `QRCodePage` component renders a full-screen, styled page that displays a QR code for users to join a game room. It extracts the `roomId` and `storyTitle` from the URL parameters, dynamically generates a join URL, and uses the `react-qrcode-logo` library to display the code. It also integrates auditory feedback for accessibility using custom hooks for text-to-speech and button click sounds.

## Components

### `QRCodePage`
- A wrapper component that renders `QRCodeContent` inside a `Suspense` boundary.
- Displays a fallback message (`"Loading..."`) while waiting for parameters or rendering delays.

### `QRCodeContent`
- Main logic and UI for rendering the QR code page.
- Retrieves query parameters, builds a join URL, and provides interactive, styled elements with accessibility features.

## Hooks Used

- **`useSearchParams()`**: From `next/navigation`, used to retrieve `roomId` and `storyTitle` from the URL.
- **`useQuickTextToSpeech()`**: Custom hook for invoking text-to-speech functionality.
- **`useButtonFeedback()`**: Custom hook to handle sound effects and speech when interacting with elements.

## Behavior

- Dynamically constructs a join URL using query parameters:
  ```ts
  const joinRoomUrl = `https://project-aac-game-team-b--storyquest-fcdc2.us-central1.hosted.app/Gameplay/\${roomId}/\${storyTitle}\;`
  ```
- If no `roomId` is found, an error message is displayed.
- QR code is rendered using the `QRCode` component with customizable visual parameters.
- Image steps provide a visual guide for how to use the QR code, with associated auditory feedback.
- Clickable text elements trigger text-to-speech narration using the provided hooks.

## Visual Elements

- **Background**: Full-screen background image with a blurred, semi-transparent foreground container.
- **Title**: "Scan to Join Room" (speech-enabled).
- **Instructions**: Four visual steps showing how to join the game using the QR code.
- **QR Code**: Styled QR code inside a bordered, shadowed container.
- **Call to Action**: Final instructional text prompting users to share the QR code.

## Usage Example

This page is intended to be routed through a `Next.js` `app/` directory with a URL containing `roomId` and `storyTitle` query parameters:

```
/CreateRoom/qrcode?page.tsx?roomId=abc123&storyTitle=MyStory
```
## Dependencies

- `react-qrcode-logo`
- `next/navigation`
- `next/image`
- Custom hooks from `/Components`:
    - `useQuickTextToSpeech`
    - `useButtonClickSounds`