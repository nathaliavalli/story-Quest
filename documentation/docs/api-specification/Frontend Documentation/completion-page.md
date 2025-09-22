---
sidebar_position: 10
---

# `CompletionPage`

The `CompletionPage` component is displayed after a story is completed in the StoryQuest game. It features a celebratory screen with sound effects, animated icons, and a navigation button to return to the homepage.

## Features

- Plays a celebratory sound when the component mounts
- Displays animated star icons
- Includes a stylized "Story Completed" ribbon and congratulatory text
- Provides a home navigation button via the `ExitButton` component

## Component Structure

```tsx
<div className="page-container">
  <div className="content-container">
    <div className="align-container" />
    <div className="align-container">
      <div className="ribbon">Story Completed</div>
      <h1 className="text-color">Great Teamwork!</h1>

        <div className="star-container">
            <Image
                src="/star-icon.svg"
                alt="Star icon"
                width={110}
                height={110}
                className="icon-spacing"
            />
            <Image
                src="/star-icon.svg"
                alt="Star icon"
                width={150}
                height={150}
                className="icon-spacing"
            />
            <Image
                src="/star-icon.svg"
                alt="Star icon"
                width={110}
                height={110}
                className="icon-spacing"
            />
        </div>

      <div className="button-container">
        <Link href="/">
          <ExitButton />
        </Link>
      </div>
    </div>
  </div>
</div>
```

## Styling

- Uses `CompletionPageStyling.css` and `CreateRoomButtonStyles.css` for layout, ribbon, and effects
- Animations and layouts styled with flexbox and icon spacing classes

## Hooks and Sounds

- `useSound` from `use-sound`: Plays `/sounds/story-completed.mp3` once on mount

## Dependencies

- `next/image` and `next/link`
- `use-sound` for sound effect
- Custom `ExitButton` from `HomePageButtons`
- Local stylesheets for page styling and animations

## Usage

```tsx
import CompletionPage from './CompletionPage/page';

export default function SomeComponent() {
  return <CompletionPage />;
}
```
