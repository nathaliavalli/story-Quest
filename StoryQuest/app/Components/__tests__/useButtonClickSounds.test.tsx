import { renderHook, act } from '@testing-library/react';
import useButtonFeedback from '../useButtonClickSounds';

// Mock the useSound hook
jest.mock('use-sound', () => {
    return jest.fn(() => [jest.fn(), jest.fn()]);
});

describe('useButtonFeedback', () => {
    // Mock functions
    const mockSpeak = jest.fn();
    let mockPlayCreate: jest.Mock;
    let mockPlaySelect: jest.Mock;
    let mockPlayBack: jest.Mock;
    let mockPlayPop: jest.Mock;
    let mockPlayGameplay: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        // Initialize mock play functions
        mockPlayCreate = jest.fn();
        mockPlaySelect = jest.fn();
        mockPlayBack = jest.fn();
        mockPlayPop = jest.fn();
        mockPlayGameplay = jest.fn();

        // Mock implementation of useSound for different sound files
        (require('use-sound') as jest.Mock).mockImplementation((soundPath: string) => {
            switch(soundPath) {
                case '/sounds/createroom-click.mp3': return [mockPlayCreate, jest.fn()];
                case '/sounds/select-click.mp3': return [mockPlaySelect, jest.fn()];
                case '/sounds/back-click.mp3': return [mockPlayBack, jest.fn()];
                case '/sounds/pop-click.mp3': return [mockPlayPop, jest.fn()];
                case '/sounds/gameplay-start.mp3': return [mockPlayGameplay, jest.fn()];
                default: return [jest.fn(), jest.fn()];
            }
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should initialize with isSpeaking as false', () => {
        const { result } = renderHook(() => useButtonFeedback());
        expect(result.current.isSpeaking).toBe(false);
    });

    describe('buttonHandler', () => {
        it('should call the correct sound function based on soundType', () => {
            const { result } = renderHook(() => useButtonFeedback());

            const testCases = [
                { type: 'create', mockFn: mockPlayCreate },
                { type: 'select', mockFn: mockPlaySelect },
                { type: 'back', mockFn: mockPlayBack },
                { type: 'pop', mockFn: mockPlayPop },
                { type: 'gameplay', mockFn: mockPlayGameplay },
            ];

            testCases.forEach(({ type, mockFn }) => {
                act(() => {
                    result.current.buttonHandler(type as any, 'test', mockSpeak);
                });
                expect(mockFn).toHaveBeenCalled();
            });
        });

        it('should call speakFn after 350ms delay', () => {
            const { result } = renderHook(() => useButtonFeedback());
          
            act(() => {
              result.current.buttonHandler('select', 'test message', mockSpeak);
            });
          
            // Sound should be called immediately
            expect(mockPlaySelect).toHaveBeenCalled();
            expect(mockSpeak).not.toHaveBeenCalled();
          
            // Fast-forward 350ms
            act(() => {
              jest.advanceTimersByTime(350);
            });
          
            // Now speak should be called
            expect(mockSpeak).toHaveBeenCalledWith('test message');
          });
    });
});