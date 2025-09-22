---
sidebar_position: 9
---

# `HomePageButtons` Components
This module defines three reusable button components used across the StoryQuest homepage and room creation/joining flows. Each button is styled with custom icons, includes auditory feedback via speech and sound effects, and is designed for accessible interaction.

## Components

### `CreateButton`

- Renders a "Create" button with a plus icon.
- On click, it triggers speech output: `"Let's Create a Game!"`.
- Applies sound and animation via `useButtonFeedback`.

---

### `JoinButton`

- Renders a "Join" button with a QR code icon.
- On click, it triggers speech output guiding the user to scan a QR code.
- Applies feedback using `useButtonFeedback`.


---

### `ExitButton`

- Renders a back/exit button with a left arrow icon.
- Can optionally behave as a link (if `asLink` is `true` and `href` is provided).
- On click, triggers speech output and navigates away if `asLink` is set.

#### Props

| Prop      | Type      | Default | Description                                   |
|-----------|-----------|---------|-----------------------------------------------|
| `asLink`  | `boolean` | `false` | If `true`, navigates to `href` on click       |
| `href`    | `string`  | `-`     | Destination URL when `asLink` is true         |
| `className` | `string` | `""`    | Optional additional class for styling         |

#### Usage

```tsx
<ExitButton asLink={true} href="/" className="custom-style" />
```

## Shared Features

All buttons use the following hooks:

- `useQuickTextToSpeech`: Provides text-to-speech feedback
- `useButtonFeedback`: Plays auditory cues and handles interactive feedback

## Accessibility

- Button icons include descriptive alternative text.
- Each button triggers spoken feedback to support users.

## Dependencies

- `next/image`
- `./HomePageButtonStyles.css`
- Custom hooks:
    - `useQuickTextToSpeech`
    - `useButtonClickSounds`
