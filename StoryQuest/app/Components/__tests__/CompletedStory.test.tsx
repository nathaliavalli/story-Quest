import React from 'react';
import { render, act } from '@testing-library/react';
import CompletedStory from '@/Components/CompletedStory';
import '@testing-library/jest-dom';

// Mocking SpeechSynthesis APIs
class MockSpeechSynthesisUtterance {
    constructor(public text: string) {}
    onend = () => {};
}
const mockSpeak = jest.fn();
const mockCancel = jest.fn();

beforeAll(() => {
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        value: MockSpeechSynthesisUtterance,
        writable: true,
    });

    Object.defineProperty(window, 'speechSynthesis', {
        value: {
            speak: mockSpeak,
            cancel: mockCancel,
            getVoices: () => [],
        },
        writable: true,
    });
});

describe('CompletedStory', () => {
    const mockOnComplete = jest.fn();
    const mockRoomId = 'test-room-123';
    const mockPhrases = ['Look in the forest, there was a bee'];
    let capturedUtterance: MockSpeechSynthesisUtterance | null = null;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        capturedUtterance = null;

        mockSpeak.mockImplementation((utterance) => {
            capturedUtterance = utterance;
        });
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should not render any visual component', () => {
        const { container } = render(
            <CompletedStory
                completedPhrases={mockPhrases}
                onComplete={mockOnComplete}
                roomId={mockRoomId}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('should schedule speech synthesis after delay', () => {
        render(
            <CompletedStory
                completedPhrases={mockPhrases}
                onComplete={mockOnComplete}
                roomId={mockRoomId}
            />
        );

        expect(mockSpeak).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(mockSpeak).toHaveBeenCalledTimes(1);
        expect(capturedUtterance?.text).toBe('Look in the forest, there was a bee. The End!');
    });


    it('should clean up on unmount', () => {
        const { unmount } = render(
            <CompletedStory
                completedPhrases={mockPhrases}
                onComplete={mockOnComplete}
                roomId={mockRoomId}
            />
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        unmount();

        expect(mockCancel).toHaveBeenCalledTimes(1);
    });

    it('should handle empty phrases array', () => {
        render(
            <CompletedStory
                completedPhrases={[]}
                onComplete={mockOnComplete}
                roomId={mockRoomId}
            />
        );

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(capturedUtterance?.text).toBe('The End!');
    });
});