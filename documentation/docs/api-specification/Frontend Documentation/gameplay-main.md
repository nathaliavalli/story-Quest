---
sidebar_position: 4
---

# `Gameplay` Page 
The `Gameplay` page is the core interactive experience of the StoryQuest app. It enables multiplayer gameplay where players fill in story blanks using an AAC (Augmentative and Alternative Communication) keyboard. Players take turns to complete sentences, select images, and animate story elements while the app updates shared game state in real time using Firebase.

## Key Features

### Left Panel
- Turn-based avatars & turn indicators
- AAC keyboard for selecting fill-in-the-blank words

### Right Panel
- Real-time multiplayer story progression using Firebase Firestore
- Image animations, text visuals of story progression, and visual effects
- Text-to-speech narration for story accessibility

## URL Parameters

- `roomId`: Firebase ID for the game room
- `storyTitle`: Story title chosen during room creation, used to load story content

## State Management

The component manages multiple state variables including:

- `phrase`, `completedPhrases`, `currentTurn`, `currentSectionIndex`
- `selectedAvatar`, `playerAvatars`, `playerNumber`
- `images`, `completedImages`, `showSparkles`, `ttsReady`
- `storyCompleted`, `showOverlay`, `difficulty`

## Firebase Integration

- Listens to real-time game state changes using `onSnapshot`
- Uses `setDoc`, `updateDoc`, and `runTransaction` to manage game and player data
- Supports sub-collections for player profiles and avatars

## Key Components Used

- `AACKeyboard`: For word selection based on the current story section
- `TextToSpeechAACButtons` and `TextToSpeechTextOnly`: For speech narration
- `CompletedStory`: Renders post-game story summary
- `CompletionPage`: Final page shown after a story is completed
- `AnimationUtils`: Includes animated effects for selected images

## Game Logic Highlights

- Each player fills in a blank with a word from the AAC keyboard
- Upon word selection, the system:
    - Fills in the blank
    - Displays the corresponding image with animation
    - Advances turn and updates Firestore state
- Game ends when all phrases are completed (e.g., "The End!")

## Accessibility

- Uses speech synthesis and audio feedback
- Button prompts and interaction texts are spoken aloud
- Visual effects provide feedback for selected actions

## Avatar Selection

- Player avatars are chosen at the start of the game, after the `JoinRoom` page
- Avatars help identify players visually during gameplay
- Stored in Firestore as part of the player profile

## Dependencies

- `firebase/firestore`
- `next/navigation`
- `framer-motion`
- Custom hooks:
    - `useAACSounds`
- Custom components:
    - `AACKeyboard`
    - `TextToSpeechAACButtons`, `TextToSpeechTextOnly`
    - `CompletedStory`, `CompletionPage`
    - `AnimationUtils` effects

