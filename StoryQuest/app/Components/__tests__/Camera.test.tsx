import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Camera from '../Camera';
import '@testing-library/jest-dom';

// Create a mock track
const createMockTrack = () => ({
  stop: jest.fn(),
  kind: 'video',
  id: 'mock-track-id',
  enabled: true,
  muted: false,
  readyState: 'live',
  contentHint: '',
  onended: null,
  onmute: null,
  onunmute: null,
  applyConstraints: jest.fn(),
  getConstraints: jest.fn(),
  getSettings: jest.fn(),
  getCapabilities: jest.fn(),
  clone: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
});

// Create a mock stream
const createMockStream = () => {
  const tracks = [createMockTrack()];
  return {
    getTracks: () => tracks,
    active: true,
    id: 'mock-stream-id',
    onaddtrack: null,
    onremovetrack: null,
    addTrack: jest.fn(),
    removeTrack: jest.fn(),
    clone: jest.fn(),
    getAudioTracks: jest.fn(() => []),
    getVideoTracks: jest.fn(() => tracks),
    getTrackById: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  };
};

// Mock the MediaDevices API
const mockGetUserMedia = jest.fn(async () => {
  return createMockStream() as unknown as MediaStream;
});

// Mock jsQR library
const mockJsQR = jest.fn();

// Mock HTML elements and methods
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockDrawImage = jest.fn();
const mockGetContext = jest.fn(() => ({
  drawImage: mockDrawImage,
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(100),
    width: 10,
    height: 10
  })),
  putImageData: jest.fn(),
  beginPath: jest.fn(),
  lineWidth: 0,
  strokeStyle: '',
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn()
}));

beforeAll(() => {
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: mockGetUserMedia
    },
    writable: true
  });

  Object.defineProperty(global, 'jsQR', {
    value: mockJsQR,
    writable: true
  });

  Object.defineProperty(HTMLVideoElement.prototype, 'play', {
    value: mockPlay,
    writable: true
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: mockGetContext,
    writable: true
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    value: jest.fn(() => 'data:image/png;base64,mockImageData'),
    writable: true
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Camera Component', () => {
  const mockSetHotspotImage = jest.fn();

  test('renders camera component', () => {
    render(<Camera setHotspotImage={mockSetHotspotImage} />);
    expect(screen.getByRole('button', { name: /capture/i })).toBeInTheDocument();
  });

  test('attempts to start camera on mount', async () => {
    await act(async () => {
      render(<Camera setHotspotImage={mockSetHotspotImage} />);
    });
    
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { 
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      expect(mockPlay).toHaveBeenCalled();
    });
  });

  test('falls back to front camera if back camera fails', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Back camera error'));
    
    await act(async () => {
      render(<Camera setHotspotImage={mockSetHotspotImage} />);
    });
    
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
    });
  });

  test('shows error message when camera access fails', async () => {
    mockGetUserMedia.mockRejectedValue(new Error('Camera access denied'));
    
    await act(async () => {
      render(<Camera setHotspotImage={mockSetHotspotImage} />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/could not access camera/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });
  });

  test('handles capture button click', async () => {
    mockGetUserMedia.mockResolvedValueOnce(createMockStream() as unknown as MediaStream);
    
    await act(async () => {
      render(<Camera setHotspotImage={mockSetHotspotImage} />);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture/i })).not.toBeDisabled();
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /capture/i }));
    });
    
    await waitFor(() => {
      expect(mockGetContext).toHaveBeenCalled();
      expect(mockDrawImage).toHaveBeenCalled();
      expect(mockSetHotspotImage).toHaveBeenCalledWith('data:image/png;base64,mockImageData');
    });
  });

  test('scans for QR codes when camera is active', async () => {
    // Mock successful camera initialization
    mockGetUserMedia.mockResolvedValueOnce(createMockStream() as unknown as MediaStream);
    
    // Mock a successful QR code detection
    mockJsQR.mockReturnValueOnce({
      data: 'qrCodeData',
      location: {
        topLeftCorner: { x: 0, y: 0 },
        topRightCorner: { x: 10, y: 0 },
        bottomRightCorner: { x: 10, y: 10 },
        bottomLeftCorner: { x: 0, y: 10 }
      }
    });
    
    await act(async () => {
      render(<Camera setHotspotImage={mockSetHotspotImage} />);
    });
    
    // Wait for scanning to complete
    await waitFor(() => {
      expect(mockJsQR).toHaveBeenCalled();
    }, { timeout: 2000 }); // Increased timeout for scanning
    
    expect(mockSetHotspotImage).toHaveBeenCalledWith('data:image/png;base64,mockImageData');
  });

});