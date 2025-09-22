---
sidebar_position: 1
---

# `Home` Page
The `Home` component serves as the main landing page for the StoryQuest application. It features the animated title, navigation buttons for creating or joining a game, and background music controls.

## Key Features

- Animated title (`AnimatedTitle`)
- Navigation to `/CreateRoom` and `/JoinRoom`
- Styled buttons with sound and speech feedback
- Background music with play/pause and volume controls

## Components Used

- **`<AnimatedTitle />`**: Displays the animated "StoryQuest" title with wave effects.
- **`<CreateButton />`**: Styled button that navigates to the Create Room page.
- **`<JoinButton />`**: Styled button that navigates to the Join Room page.
- **`<HomePageBackgroundMusic />`**: Music component allowing users to control background audio.

## Styling

- Uses `HomePageStyles.css` for layout and design
- Background image: `images/home-background.jpg`
- Buttons and containers styled with padding, border radius, and shadows

## Structure

```tsx
<div className="fixed inset-0 flex flex-col ...">
  <div className="flex flex-col items-center ...">
    <AnimatedTitle />
    <div className="flex flex-col md:flex-row ...">
      <Link href="/CreateRoom"><CreateButton /></Link>
      <Link href="/JoinRoom"><JoinButton /></Link>
    </div>
    <footer>
      <HomePageBackgroundMusic />
      <h1>Copyright © 2025 StoryQuest</h1>
    </footer>
  </div>
</div>
```

## Accessibility

- Navigation buttons have speech and sound feedback using hooks from `useQuickTextToSpeech` and `useButtonFeedback`
- Animations avoid excessive motion after initialization

## Usage Example

```tsx
import Home from './app/page';

export default function App() {
  return <Home />;
}
```

## Dependencies

- `next/link`
- Custom components:
    - `AnimatedTitle`
    - `CreateButton`
    - `JoinButton`
    - `HomePageBackgroundMusic`
