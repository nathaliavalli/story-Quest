// project-aac-game-team-b/StoryQuest/app/CreateRoom/__tests__/page.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateRoomPage from '../page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

jest.mock('../../../firebaseControls/firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('../../Components/useQuickTextToSpeech', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    speak: jest.fn(),
  })),
}));

jest.mock('../../Components/useButtonClickSounds', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    buttonHandler: jest.fn(),
    isSpeaking: false,
  })),
}));

// Mock Web Speech API
beforeEach(() => {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn(() => []),
      onvoiceschanged: null,
    },
    writable: true,
  });

  global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
    text,
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1,
  }));
});

describe('CreateRoomPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders the initial step with story selection', () => {
    render(<CreateRoomPage />);
    
    expect(screen.getByText("Let's Create a Game!")).toBeInTheDocument();
    expect(screen.getByText('Choose Your Story')).toBeInTheDocument();
    expect(screen.getByText('The Garden Adventure')).toBeInTheDocument();
    expect(screen.getByText('Walk in the Forest')).toBeInTheDocument();
    expect(screen.getByText('Under the Sea')).toBeInTheDocument();
    expect(screen.getByText('Space Adventure')).toBeInTheDocument();
  });

  it('navigates through all steps correctly', async () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Step 1: Select story
    fireEvent.click(getByText('The Garden Adventure'));
    expect(getByText('How Many Friends Are Playing?')).toBeInTheDocument();
    
    // Step 2: Select players
    fireEvent.click(getByText('2 Players'));
    expect(getByText('Pick Game Difficulty')).toBeInTheDocument();
    
    // Step 3: Select difficulty - use the exact text from the button
    fireEvent.click(getByText('Easy'));
    expect(getByText('Ready to Play!')).toBeInTheDocument();
    
    // Step 4: Verify summary - use the exact text from the summary
    expect(getByText('The Garden Adventure')).toBeInTheDocument();
    expect(getByText('2 Players')).toBeInTheDocument();
    expect(getByText('easy:')).toBeInTheDocument(); // Note the colon in the summary
  });

  it('shows the correct number of player emojis', () => {
    const { getByText, getAllByText } = render(<CreateRoomPage />);
    
    // Go to player selection step
    fireEvent.click(getByText('The Garden Adventure'));
    
    // Count emojis in the 2 Players button
    const twoPlayersButton = getByText('2 Players').closest('button');
    const emojis2 = twoPlayersButton?.querySelectorAll('[class*="text-2xl"]');
    expect(emojis2?.length).toBe(2);
    
    // Count emojis in the 3 Players button
    const threePlayersButton = getByText('3 Players').closest('button');
    const emojis3 = threePlayersButton?.querySelectorAll('[class*="text-2xl"]');
    expect(emojis3?.length).toBe(3);
    
    // Count emojis in the 4 Players button
    const fourPlayersButton = getByText('4 Players').closest('button');
    const emojis4 = fourPlayersButton?.querySelectorAll('[class*="text-2xl"]');
    expect(emojis4?.length).toBe(4);
  });

  it('shows the correct difficulty color coding', async () => {
    const { getByText } = render(<CreateRoomPage />);
    
    // Go to difficulty step (Step 3)
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    
    // Get difficulty buttons in Step 3
    const easyButton = getByText('Easy').closest('button');
    const mediumButton = getByText('Medium').closest('button');
    const hardButton = getByText('Hard').closest('button');
    
    // Verify initial classes
    expect(easyButton).toHaveClass('bg-white');
    expect(easyButton).toHaveClass('border-gray-200');
    
    // Select easy (but don't proceed to next step)
    fireEvent.click(getByText('Easy'));
    
    // Check the button styles in Step 3
    await waitFor(() => {
      expect(easyButton).toHaveClass('bg-white rounded-xl shadow-md border-2 p-4 h-[110px] w-full transition-all flex flex-col justify-center items-center border-gray-200 hover:border-green-400');
      expect(easyButton).toHaveClass('bg-white rounded-xl shadow-md border-2 p-4 h-[110px] w-full transition-all flex flex-col justify-center items-center border-gray-200 hover:border-green-400');
      
      // Verify other buttons remain unselected
      expect(mediumButton).not.toHaveClass('bg-orange-100');
      expect(mediumButton).toHaveClass('bg-white');
      expect(hardButton).not.toHaveClass('bg-red-100');
      expect(hardButton).toHaveClass('bg-white');
    });
  });

  it('shows the correct story image in the summary', () => {
    const { getByText, getByAltText } = render(<CreateRoomPage />);
    
    // Test with one story to simplify
    fireEvent.click(getByText('The Garden Adventure'));
    fireEvent.click(getByText('2 Players'));
    fireEvent.click(getByText('Easy'));
    
    // Verify image
    const img = getByAltText('The Garden Adventure');
    expect(img).toHaveAttribute('src', '/images/garden-background.webp');
  });
});