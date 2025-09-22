---
sidebar_position: 2
---
# Camera Component (QR Code Scanning)
`Camera.tsx`: This React component provides functionality for accessing the camera, scanning QR codes, and capturing images. It uses the `jsQR` library for QR code scanning and provides a visual interface for interacting with the camera.

## Props

### `setHotspotImage`
- **Type:** `(imageData: string) => void`
- **Description:** A function passed as a prop to handle the captured image data (in base64 string format).

## State

- **`stream`** (`MediaStream | null`): Holds the current camera stream.
- **`cameraError`** (`string | null`): Stores any error messages related to camera access.
- **`isScanning`** (`boolean`): Tracks whether continuous scanning is active.
- **`scanIntervalRef`** (`NodeJS.Timeout | null`): Holds the reference for the scanning interval.

## Refs

- **`videoRef`** (`React.RefObject<HTMLVideoElement>`): A reference to the video element for displaying the camera feed.
- **`canvasRef`** (`React.RefObject<HTMLCanvasElement>`): A reference to a hidden canvas element used for QR code scanning.

## Functions

### `startCamera`
- **Description:**  
  Starts the camera stream by first attempting to access the back camera (`facingMode: "environment"`) and, if that fails, falls back to the front camera (`facingMode: "user"`).  
  Initializes continuous scanning after a short delay.

### `preprocessImageData`
- **Description:**  
  Processes the image data for better QR code recognition by adjusting the contrast and brightness of the image.

    - **Parameters:**
        - `imageData` (`ImageData`): The image data to process.
    - **Returns:** `ImageData`: The processed image data.

### `captureAndScanFrame`
- **Description:**  
  Captures a frame from the video feed, processes it, and attempts to scan for QR codes using `jsQR`. If a QR code is detected, it stops the scanning loop and triggers the `setHotspotImage` callback with the captured image.

### `startContinuousScan`
- **Description:**  
  Starts a continuous scan loop at an interval of 300ms, calling `captureAndScanFrame` to scan frames continuously.

### `stopContinuousScan`
- **Description:**  
  Stops the continuous scanning loop.

### `captureImage`
- **Description:**  
  Captures the current video frame and converts it to a base64 PNG image. The captured image is passed to the `setHotspotImage` callback.

### `useEffect`
- **Description:**  
  Initializes the camera and starts the scanning process when the component is mounted. It also cleans up by stopping the camera and scanning when the component is unmounted.

## UI Structure

### Camera Display

The camera feed is displayed using a `<video>` element that is rendered at full width and height, with the aspect ratio preserved. A QR code alignment guide (a green rectangle) is overlaid on the video to help users align QR codes within the camera frame. If scanning is active, the rectangle pulses in yellow.

### Controls

To the right of the video feed, there is a button to capture the current image from the video feed. The button is only enabled if the camera stream is active. If there is a camera error, an error message is shown with an option to retry accessing the camera.

## Example Usage

```tsx
import React, { useState } from 'react';
import Camera from './Camera';

const MyComponent: React.FC = () => {
  const [hotspotImage, setHotspotImage] = useState<string | null>(null);

  return (
    <div>
      <Camera setHotspotImage={setHotspotImage} />
      {hotspotImage && (
        <div>
          <h2>Captured Image</h2>
          <img src={hotspotImage} alt="Captured QR code" />
        </div>
      )}
    </div>
  );
};
```