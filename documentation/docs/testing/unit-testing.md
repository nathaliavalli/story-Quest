---
sidebar_position: 1
---
# Unit Tests
(For each method, there are one or more test cases. A test case consists of input parameter values and expected results. 
All external classes should be stubbed using mock objects.)

# Purpose
The Test Procedures describe the test approach and the tests to be performed to verify the requirements 
specified in the Requirements Document.

# Library Explanation
We chose Jest along with the React Testing Library.

## Jest
- **Primary Testing Framework**
- Selected because:
    - Code coverage reporting
    - Mocking ability
    - Perfect integration with React and Next.js

## React Testing Library
- **UI Testing Utility**
- Selected because:
    - Simulates user testing

## Setup
1. Required Dependencies
   ```json
   {
     "jest": "^27.0.0",
     "@testing-library/react": "^12.0.0",
     "@testing-library/jest-dom": "^5.0.0"
   }
   ```

2. Running Tests
   ```bash
   # Run all tests
   npm test
   
   # Run with coverage
   npm test -- --coverage
   
   # Run specific test file
   npm test -- completionPage.test.tsx
   ```

## Test Structure
```typescript
describe('Component/Method Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```



## Test Cases and Implementation
Unit tests for GamePlay are located in `StoryQuest/app/Gameplay/__tests__/gameplay.test.tsx`.
## Gameplay Testing

Here are the key test cases:
### `handleWordSelect()`
This method processes word selections and is tested through both direct word selection and AAC interface. The 
test `handles word selection through AAC keyboard` demonstrates this by clicking the "mouse" button and 
verifying the phrase updates from "Look in the garden, there is a ___" to include "mouse". Error handling is 
verified through the `handles invalid word selection gracefully` test.

### `handleAddImage()`
This method manages image rendering and positioning, tested through the `displays images when words are 
selected` test. It verifies both image presence and correct positioning after word 
selection, specifically checking for proper rendering of 'mouse.svg' and other story images.

### `handleAACSelect()`
This method handles AAC interface interactions, tested extensively in `handles word selection through AAC 
keyboard`. It verifies proper button functionality and includes error 
handling as shown in the invalid word selection test.

### `renders without crashing`
This test ensures basic component rendering functionality. It verifies the presence of the "Select Story:" 
text, demonstrating proper initial component mounting. No mocks are needed for this basic rendering test.

### `initializes with the first story`
This test verifies proper initialization state. It checks for the default story's first phrase "Look in the 
garden, there is a ___", ensuring the story data is properly loaded and displayed on component mount.

### `handles word selection through AAC keyboard`
This test verifies the complete word selection flow. It simulates AAC button clicks and verifies phrase 
updates, demonstrating integration between the AAC interface and phrase display.

### `displays images when words are selected`
This test ensures proper image handling. It verifies both image rendering and positioning after word 
selection, checking specific CSS properties and image presence in the DOM.

### `plays sound when a valid AAC word is selected`
This test ensures proper sound output. It verifies that when an icon on the AAC board is clicked, 
the correct phrase is being played aloud to the user by checking the return value of the sound sprite. This 
ensures engagement via text and audio. 

### `shows "The End!" when all sections are completed`
This test verifies game completion logic. It simulates completing story sections and checks for the appearance 
of the completion message, demonstrating proper game flow handling.

### `handles invalid word selection gracefully`
This test verifies error handling. It uses a Jest spy on window.alert to verify proper error messaging when 
invalid words are selected, demonstrating robust error handling in the AAC interface.

## HomePage
Unit tests for HomePage are located in 'StoryQuest/app/__tests__/page.test.tsx'

### `renders the text of the animated title correctly`
This test verifies that animated title is rendered properly. It checks that the rendered span text matches the
string characters of ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'].

### `renders the copyright text correctly`
This test verifies that the copyright text in the footer is rendered correctly. It checks that the correct text, 
'Copyright © 2025 StoryQuest', is displayed on the page.

### `renders profile button correctly`
This test checks that the profile button is rendered correctly. It ensures that the button is rendered on the page and 
has the correct text content, 'Profile'.

### `renders create button correctly`
This test ensures the create button is displayed correctly. It verifies that the button is rendered on the page and
contains the text 'Create'.

### `renders join button correctly`
This test ensures the join button is displayed correctly. It confirms that the button is rendered on the page and
has the text 'Join'.

### `renders gameplay button correctly`
This test ensures the gameplay button is displayed correctly. It checks that the button is rendered on the page and
contains the text 'Gameplay'.


## Room Creation Testing
The room creation testing ensures that a user is able to initiate settings to accommodate the game room, such as choosing a story, the number of players, and the difficulty level. 
Unit tests for Room Creation are located in `StoryQuest/app/CreateRoom/__tests__/createRoom.test.tsx`.

### `renders the CreateRoomPage component`
This test checks that the component renders properly, ensuring that all setting choices are displayed on the screen. 

### `displays alert when user does not select all settings`
This test is to ensure that a user cannot create a room without choosing all the settings. For example, if a difficulty is not chosen, an alert is displayed to notify the user.

### `logs correct data when all selections are made`
This test checks to see that all the data is logged correctly after the user makes their selections.

### `allows user to change selected story`
This test is to ensure that a user is able to select a different setting than their primary choice and have it still rendered on screen.

## Join Room
The join room testing ensures that the page renders correctly so that users will be able to have a standarized view of the page. This test is located at `StoryQuest/app/JoinRoom/__tests__/page.test.tsx` 

### `renders the component without crashing`
This test makes sure that the whole page renders with out crashing or that any other problems happen

### `displays the exit button`
This test is used to mkae sure that the exit button is alsways being displayed on the page. withoutthis button
user would not be able to navigate back to the home page.

### `renders the QR instructions section with correct content` 
This test makes sure that the instructions for scaning the QR code arent tampered with and are still present on the page

### `renders all four QR instruction images`
This test is here to make sure that the images are rendered correctly. These images are important becasue they allow users 
who may not be able to read gain insight on how ot join a lobby.

### `renders the camera section with correct heading`
This test is here to make sure that the camera portion of the join room page is rendered in correctly. This is vital so that
users are able to scan the qr code.

### `has the correct structure of nested divs`
This test is for making sure that divs have proper closing tags and that they exist.

### `does not show the failed popup by default`
This test is here to make sure that the failed to scan QR code pop up does not pop up on the screen by defualt. 

## Components
The component testing ensures that each component contained within the webapp exhibits the expected behavior.

## AACKeyBoard Component

Unit tests for AACKeyBoard are located in `StoryQuest/app/Components/__tests__/AACKeyBoard.test.tsx`.

### `renders correctly with default props`
This test verified that basic rendering, with default properties happens. This included checking that all symbols are displayed as buttons
and confirming the presence of the "AAC Keyboard" title.

### `applies custom background and button colors`
This test checks the custom styling props, verifying the container background and button colors are correct.

### `renders images with correct alt text`
This test validates image rendering by checking image sources and alternate text.  For example, each image should exist.

### `has proper accessibility attributes`
This test verifies accessibility features, making sure each symbol button on the AAC board has an aria-label.

### `renders correct grid layout`
This test verifies layout structure and checks the CSS grid implementation.

### `handles empty symbols array gracefully`
This test checks for edge cases, when the array gives the board no symbols, and verifies that empty state is handled 
correctly and cleanly.

## Camera Component

Unit tests for the Camera component are located in `StoryQuest/app/Componnents/__tests__/Camera.test.tsx`.

### `renders camera component`
This test checks for basic rendering and verifies that the capture button is present on screen.

### `attempts to start camera on mount`
This test tries camera initialization, verifying media constraints and checking video play capability in the process.

### `falls back to front camera if back camera fails`
This test ensures that if the default behavior (back camera) can not be achieved, the error is handled and we fallback to 
secondary behavior (front camera), while maintaining resolution.

### `shows error message when camera access fails`
This test checks error state UI and verifies the existences of the retry button

### `handles capture button click`
This test runs photo capture and verifies canvas operations by checking the image callback

### `scans for QR codes when camera is active`
This test is for QR detection. It verifies the jsQR integration and checks the callback with the results

## CompletedStory Component

Unit tests for the CompletedStory component are located in `StoryQuest/app/Components/__tests__/CompletedStory.test.tsx`

### `should not render any visual component`
This test checks the invisible nature of the completed story, and verifies an empty container is present.

### `should schedule speech synthesis after delay`
This test verifies the timing of narration and utterance content played.

### `should clean up on unmount`
This test is for cleanup, and verifies speech cancellation on unmount 

### `should handle empty phrases array`
This test is for an edge case, where we verify that even with an empty phrase array we can error-handle 
gracefully and return "The End!"

## TextToSpeechPhrases Component

Unit tests for the TextToSpeechPhrases component are located in `StoryQuest/app/Components/__tests__/TextToSpeechPhrases.test.tsx`.

### `initializes and selects a preferred voice`
This test verifies that the component properly loads available voices and sets up event listeners to handle voice changes, ensuring the speech synthesis is ready for use.

### `does not call speechSynthesis.speak when voices are not loaded`
This test confirms that the component gracefully handles the voice loading state by not attempting to speak until voices become available.

### `calls speechSynthesis.speak with underscores replaced in text`
This test ensures the component correctly processes text by replacing underscores with spaces before speaking, resulting in natural pronunciation.

### `cancels speech when unmounted`
This test verifies that the component performs proper cleanup by canceling any ongoing speech and removing event listeners when unmounted.

### `does not speak when text is empty`
This tests confirms the component handles empty text inputs gracefully by skipping speech synthesis entirely.

## TextToSpeechTextOnly Component

Unit tests for the TextToSpeechPhrases component are located in `StoryQuest/app/Components/__tests__/TextToSpeechTextOnly.test.tsx`.

### `should handle voices loading via event`
This test verifies the component properly initializes speech synthesis and waits for voices to load through the voiceschanged event.

### `should handle unsupported speech synthesis`
This test confirms the component fails gracefully when the speech synthesis API is unavailable, rendering nothing and avoiding errors.

### `should initialize and wait for voices`
This test ensures the component sets up proper event listeners and voice selection logic during initialization.

### `should clean up on unmount`
This test verifies the component cancels any pending speech and removes event listeners during unmounting.

## useAACSounds Hook

Unit tests for the useAACSounds component are located in `StoryQuest/app/Components/__tests__/useAACSounds.test.tsx`.

### `should load sound correctly`
Confirms the hook properly initializes Audio instances with correct URLs and preload settings for immediate playback.

## useButtonClickSounds Hook

Unit tests for the useButtonClickSounds component are located in `StoryQuest/app/Components/__tests__/useButtonClickSounds.test.tsx`.

### `should initialize with isSpeaking as false`
Verifies the hook initializes with the correct default state for speech tracking.

### `buttonHandler calls the correct sound function`
Ensures the hook plays the appropriate sound effect based on the button type provided.

### `buttonHandler calls speakFn after 350ms delay`
Confirms the hook properly synchronizes sound effects with speech feedback using the correct timing.

## useQuickTextToSpeech Hook

Unit tests for the useQuickTextToSpeech component are located in `StoryQuest/app/Components/__tests__/useQuickTextToSpeech.test.tsx`.

### `should initialize and set isReady to true`
Verifies the hook properly initializes and updates its ready state when voices are loaded.

### `should select a preferred voice`
Confirms the hook's voice selection logic chooses an appropriate voice from available options.

### `should call speak() and use speechSynthesis`
Ensures the hook correctly utilizes the speech synthesis API when speaking text.

### `should call stop() and cancel speech`
Verifies the hook properly cancels ongoing speech when the stop function is called.

## useTextToSpeech Hook

Unit tests for the useTextToSpeech component are located in `StoryQuest/app/Components/__tests__/useTextToSpeech.test.tsx`.

### `should handle platform-specific voice selection`
Confirms the hook properly prioritizes high-quality, platform-specific voices when available.

### `should handle speech synthesis errors gracefully`
Verifies the hook maintains stability even when speech synthesis encounters errors.

### `should properly clean up resources`
Ensures the hook cancels any active speech and removes listeners when unmounted.


## Test coverage report:
npx jest --coverage: This generates the coverage report that showcases even how many lines of code are being tested.

