class MockSpeechSynthesisUtterance {
    text: string;
    constructor(text: string) {
      this.text = text;
    }
    // stub out the event API so addEventListener won’t crash
    addEventListener(type: string, listener: (...args: any[]) => void) {
    }
    removeEventListener(type: string, listener: (...args: any[]) => void) {

    }
  }
  
(global as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
  
  // stub pause
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: jest.fn(),
  });

  //mock of useAACSounds component
  jest.mock('../../Components/useAACSounds', () => {
  
    const originalModule = jest.requireActual('../../Components/useAACSounds');
    
    // Create a mock function
    const mockPlaySound = jest.fn();
    
    return {
      __esModule: true,
      default: () => ({
        ...originalModule.default(),
        playSound: mockPlaySound, // Override just the playSound function
      }),
      mockPlaySound // Export
    };
  });

const { mockPlaySound } = require('../../Components/useAACSounds');
import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { db } from '../../../firebaseControls/firebaseConfig';

// Mock Firebase and other dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ roomId: 'test123', storyTitle: 'The%20Garden%20Adventure' })),
  useRouter: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    ...jest.requireActual('firebase/firestore'),
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    onSnapshot: jest.fn(() => () => {}), // This provides an unsubscribe function
    collection: jest.fn(),
    serverTimestamp: jest.fn(),
    runTransaction: jest.fn(),
  })); 

beforeEach(() => {
    jest.clearAllMocks();
  
    // Mock Firestore to simulate a successful update
    const mockUpdateDoc = jest.fn().mockResolvedValue(undefined);
    const mockGetDoc = jest.fn().mockImplementation((ref) => {
      if (ref.path.includes('games/test123')) {
        return Promise.resolve({
          exists: () => true,
          data: () => ({
            currentPhrase: "Look in the garden, there is a ___",
            currentTurn: 1,
            gameStatus: "in_progress",
            completedPhrases: [],
            completedImages: [],
            currentSectionIndex: 0,
            maxPlayers: 4
          })
        });
      }
      return Promise.resolve({ exists: () => false });
    });
  
    // Mock onSnapshot to simulate real-time updates
    let snapshotCallback: any = null;
    const mockOnSnapshot = jest.fn((_, callback) => {
      snapshotCallback = callback;
      return jest.fn(); // unsubscribe function
    });
  
    // Mock the Firestore functions
    jest.mock('firebase/firestore', () => ({
      ...jest.requireActual('firebase/firestore'),
      doc: jest.fn((path) => ({ path })),
      getDoc: mockGetDoc,
      updateDoc: mockUpdateDoc,
      onSnapshot: mockOnSnapshot,
      collection: jest.fn(),
      serverTimestamp: jest.fn(() => 'MOCK_TIMESTAMP'),
      runTransaction: jest.fn(async (transaction) => {
        await transaction({ get: mockGetDoc });
      })
    }));
  
    // Simulate a Firestore update after word selection
    mockUpdateDoc.mockImplementation(() => {
      if (snapshotCallback) {
        snapshotCallback({
          exists: () => true,
          data: () => ({
            currentPhrase: "Look in the garden, there is a mouse",
            currentTurn: 2, // Rotate turn
            gameStatus: "in_progress",
            completedPhrases: ["Look in the garden, there is a mouse"],
            completedImages: [{ src: '/images/mouse.svg', alt: 'mouse', x: 20, y: 30 }],
            currentSectionIndex: 1
          })
        });
      }
      return Promise.resolve();
    });
  });

  
jest.mock('use-sound', () => jest.fn(() => [jest.fn()]));

// Mock stories data
jest.mock('../stories', () => ({
  __esModule: true,
  default: [
    {
      title: 'The Garden Adventure',
      sections: [
        { phrase: 'Look in the garden, there is a ___', words: { mouse: { image: 'mouse.svg', x: 20, y: 30 } } },
        { phrase: 'The ___ is hiding', words: { cat: { image: 'cat.svg', x: 40, y: 50 } } }
      ],
      backgroundImage: 'garden.jpg',
      colorTheme: { backgroundColor: 'yellow', buttonColor: 'green' }
    }
  ]
}));

// Mock speech synthesis
const mockSynth = {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn(() => []),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  Object.defineProperty(window, 'speechSynthesis', {
    value: mockSynth,
    writable: true,
  });

import Home from '../[roomId]/[storyTitle]/page';
import useAACSounds from '@/Components/useAACSounds';

describe('Home', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('renders without crashing', async () => {
        render(<Home />);
        // In test mode we immediately show the first story phrase
        expect(await screen.findByText(/Look in the garden/i)).toBeInTheDocument();
      });
      
      test('initializes with the first story', async () => {
        render(<Home />);
        
        await waitFor(() => {
          expect(screen.getByText(/Look in the garden/i)).toBeInTheDocument();
        });
      });
      
      test('handles word selection through AAC keyboard', async () => {
    
        let snapshotCallback: any = null;
        
        // Override the onSnapshot mock to capture the callback
        (require('firebase/firestore').onSnapshot as jest.Mock).mockImplementation((_, callback) => {
            snapshotCallback = callback;
            return jest.fn();
        });

        render(<Home />);
        
        // Wait for initial render
        await screen.findByText(/Look in the garden/i);
        
        // Find and click the mouse button
        const mouseButton = await screen.findByAltText('mouse');
        fireEvent.click(mouseButton);

        // Manually trigger the snapshot callback with updated data
        act(() => {
            snapshotCallback({
            exists: () => true,
            data: () => ({
                currentPhrase: "Look in the garden, there is a mouse",
                currentTurn: 2,
                gameStatus: "in_progress",
                completedPhrases: ["Look in the garden, there is a mouse"],
                completedImages: [{ src: '/images/mouse.svg', alt: 'mouse', x: 20, y: 30 }],
                currentSectionIndex: 1
            })
            });
  });

  // Verify the phrase was updated
  await waitFor(() => {
    expect(screen.getByText(/there is a mouse/i)).toBeInTheDocument();
  }, { timeout: 3000 });
      });
  
    test('displays images when words are selected', async () => {
    // Mock player state
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [1, jest.fn()]) // playerNumber
        .mockImplementationOnce(() => [1, jest.fn()]) // currentTurn
        .mockImplementationOnce(() => [false, jest.fn()]); // avatarModalOpen

    render(<Home />);
    
    await waitFor(() => {
        expect(screen.getByText(/Look in the garden/i)).toBeInTheDocument();
    });
    });

  
    test('plays sound when a valid AAC word is selected', async () => {
        // Setup player state and Firebase mocks
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [1, jest.fn()]) // playerNumber = 1
        .mockImplementationOnce(() => [1, jest.fn()]); // currentTurn = 1

        // Mock Firestore to return player data
        require('firebase/firestore').getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            currentTurn: 1,
            player1Id: 'test-player-1'
        })
        });

        // Set session storage
        sessionStorage.setItem('player-uid', 'test-player-1');

        // Render the component
        render(<Home />);

        // Find and click the button
        const mouseButton = await screen.findByAltText('mouse');
        fireEvent.click(mouseButton);

        // Verify sound was played
        await waitFor(() => {
        expect(mockPlaySound).toHaveBeenCalledWith('mouse');
        });
    });
  
    test('shows "The End!" when all sections are completed', async () => {
      //  Mock Firestore references
        const mockGameRef = { 
            path: 'games/test123',
            id: 'test123',
            parent: null
        };
        
        const mockPlayersColRef = {
            path: 'games/test123/players',
            id: 'players',
            parent: mockGameRef
        };

        // Configure Firestore mocks
        const firestore = require('firebase/firestore');
        
        firestore.doc.mockImplementation((path: string | string[]) => 
            path?.includes?.('players') ? mockPlayersColRef : mockGameRef
        );
        
        firestore.collection.mockReturnValue(mockPlayersColRef);

        // Mock completed game data
        const completedGameData = {
            currentPhrase: "The End!",
            gameStatus: "completed",
            completedPhrases: ["First phrase", "Second phrase"],
            currentSectionIndex: 2,
            currentTurn: 1,
            maxPlayers: 4
        };

        // mock players collection snapshot
        const mockPlayersSnapshot = {
            docs: [
            {
                id: 'player1',
                data: () => ({
                avatar: '🐯',
                playerNumber: 1
                })
            },
            {
                id: 'player2',
                data: () => ({
                avatar: '🐻', 
                playerNumber: 2
                })
            }
            ],
            forEach: function(callback: (value: { id: string; data: () => { avatar: string; playerNumber: number; }; }, index: number, array: { id: string; data: () => { avatar: string; playerNumber: number; }; }[]) => void) {
            this.docs.forEach(callback);
            }
        };

        // Set up onSnapshot mocks
        firestore.onSnapshot.mockImplementation((ref: { path: string | string[]; }, callback: (arg0: { docs?: { id: string; data: () => { avatar: string; playerNumber: number; }; }[]; forEach?: (callback: (value: { id: string; data: () => { avatar: string; playerNumber: number; }; }, index: number, array: { id: string; data: () => { avatar: string; playerNumber: number; }; }[]) => void) => void; exists?: () => boolean; data?: () => { currentPhrase: string; gameStatus: string; completedPhrases: string[]; currentSectionIndex: number; currentTurn: number; maxPlayers: number; }; }) => void) => {
            if (ref?.path?.includes('players')) {
            callback(mockPlayersSnapshot);
            } else {
            callback({
                exists: () => true,
                data: () => completedGameData
            });
            }
            return jest.fn(); // unsubscribe
        });

        render(<Home />);

        // Verify completion
        await waitFor(() => {
            expect(screen.getByText(/the end!/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });
  
    test('handles invalid word selection gracefully', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Properly mock the Firebase unsubscribe
        const mockUnsubscribe = jest.fn();
        require('firebase/firestore').onSnapshot.mockImplementation(() => mockUnsubscribe);
        
        // Mock player setup
        jest.spyOn(React, 'useState')
          .mockImplementationOnce(() => [{ playerNumber: 2, currentTurn: 1 }, jest.fn()]);
        
        render(<Home />);
      
        alertSpy.mockRestore();
      });

  });
