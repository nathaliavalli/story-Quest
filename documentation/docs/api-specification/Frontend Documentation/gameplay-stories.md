---
sidebar_position: 5
---

# Stories.tsx Module
This module defines the stories used in the StoryQuest gameplay experience. Each story is composed of multiple sections, each containing a sentence with a blank and a list of selectable words. Each word is associated with an image, animation effect, and position, used to enhance visual storytelling and AAC interaction.

## Interfaces

### `StorySection`

Represents a single sentence in a story with a blank to be filled by a user.

```ts
interface StorySection {
  phrase: string;
  words: {
    [word: string]: {
      image: string;
      x: number;
      y: number;
      effect?: 'spin' | 'pulse' | 'fade' | 'bounce' | 'flip' | 'sideToSide' | 'upAndDown' | 'scaleUp' | 'none' | 'SlideAcrossEffect';
      width?: number;
      height?: number;
    };
  };
}
```

### `Story`

A complete story object used in the app.

```ts
interface Story {
  title: string;
  backgroundImage: string;
  sections: StorySection[];
  colorTheme: {
    backgroundColor: string;
    buttonColor: string;
  };
}
```

## Exports

### `stories`
An array of `Story` objects representing the available narratives in the game.

## Story Themes

Each story includes:
- A unique title
- A background image (used in the gameplay environment)
- A consistent color theme
- Multiple sections with:
    - A phrase containing a blank
    - Selectable words mapped to visuals and effects

## Available Stories

### 1. **The Garden Adventure**
- Theme: Nature and imagination in a garden setting
- Effects: `flip`, `pulse`, `fade`, `sideToSide`, `scaleUp`, `upAndDown`
- Example Phrase: "Look in the garden, there is a ___."

### 2. **Walk in the Forest**
- Theme: Forest path and discovery
- Effects: Includes `pulse`, `none`, `fade`, `upAndDown`, `scaleUp`
- Example Phrase: "On the path there is a ___."

### 3. **Space Adventure**
- Theme: Outer space with astronauts, planets, and aliens
- Effects: `spin`, `bounce`, `pulse`, `sideToSide`, `fade`
- Example Phrase: "We are travelling through space and saw a(n) ___."

### 4. **Under the Sea**
- Theme: Marine life and ocean exploration
- Effects: `scaleUp`, `bounce`, `flip`, `fade`, `pulse`, `sideToSide`
- Example Phrase: "It is a beautiful day under the ocean, on our right we see a ___."

## Use in Gameplay

- These stories are imported into the gameplay component and dynamically selected based on room setup.
- The `words` object within each section provides the content for the AAC keyboard and visual animation triggers.

- Animations are handled using Framer Motion and custom animation components.
- Word effects are used to animate selected images on the story screen.


