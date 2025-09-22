import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinRoomPage from '../../JoinRoom/page';

// Mock the necessary dependencies
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('../../../firebaseControls/firebaseConfig', () => ({
  db: {},
}));

jest.mock('use-sound', () => {
  return () => [jest.fn()];
});

jest.mock('jsqr', () => {
  return jest.fn();
});

jest.mock('../../Components/Camera', () => {
  return {
    __esModule: true,
    default: ({ setHotspotImage }: { setHotspotImage: (image: string) => void }) => {
      return <div data-testid="camera-component">Camera Component</div>;
    },
  };
});

jest.mock('../../Components/useQuickTextToSpeech', () => {
  return () => ({
    speak: jest.fn(),
  });
});

jest.mock('../../Components/useButtonClickSounds', () => {
  return () => ({
    buttonHandler: jest.fn(),
    isSpeaking: false,
  });
});

describe('JoinRoomPage Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the component without crashing', () => {
    render(<JoinRoomPage />);
    expect(screen.getByText(/Scan Below/i)).toBeInTheDocument();
  });

  it('displays the exit button', () => {
    render(<JoinRoomPage />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('renders the QR instructions section with correct content', () => {
    render(<JoinRoomPage />);
    
    // Check heading
    expect(screen.getByText('GRAB A TABLET AND FOLLOW THE PICTURES BELLOW')).toBeInTheDocument();
    
    // Check step instructions are present
    expect(screen.getByText('Point the camera')).toBeInTheDocument();
    expect(screen.getByText('Find this picture')).toBeInTheDocument();
    expect(screen.getByText('Wait for scan')).toBeInTheDocument();
    expect(screen.getByText('Play together')).toBeInTheDocument();
  });

  it('renders all four QR instruction images', () => {
    render(<JoinRoomPage />);
    
    const images = screen.getAllByAltText(/Step \d/);
    expect(images.length).toBe(4);
    
    expect(images[0]).toHaveAttribute('src', '/diagrams/QR1.png');
    expect(images[1]).toHaveAttribute('src', '/diagrams/QR2.png');
    expect(images[2]).toHaveAttribute('src', '/diagrams/QR3.png');
    expect(images[3]).toHaveAttribute('src', '/diagrams/QR4.png');
  });

  it('renders the camera section with correct heading', () => {
    render(<JoinRoomPage />);
    
    expect(screen.getByText('Scan Below')).toBeInTheDocument();
    expect(screen.getByTestId('camera-component')).toBeInTheDocument();
  });

  it('has the correct structure of nested divs', () => {
    const { container } = render(<JoinRoomPage />);
    
    // Main container div with background
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('h-screen', 'w-screen', 'fixed', 'inset-0');
    
    // Check for the QR instructions section
    const qrInstructionsDiv = screen.getByText('GRAB A TABLET AND FOLLOW THE PICTURES BELLOW').closest('div');
    expect(qrInstructionsDiv).toHaveClass('bg-white/90', 'backdrop-blur-sm', 'rounded-2xl');
    
    // Check for the camera section
    const cameraSectionDiv = screen.getByText('Scan Below').closest('div');
    expect(cameraSectionDiv).toHaveClass('bg-white/90', 'backdrop-blur-sm', 'rounded-2xl');
  });

  it('does not show the failed popup by default', () => {
    render(<JoinRoomPage />);
    
    // The failed popup text should not be visible initially
    expect(screen.queryByText('Need help scanning?')).not.toBeInTheDocument();
  });
});