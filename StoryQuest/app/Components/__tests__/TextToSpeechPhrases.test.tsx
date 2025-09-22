import React from 'react';
import { render, act } from '@testing-library/react';
import TextToSpeechTextOnly from '../TextToSpeechTextOnly';

// Mock SpeechSynthesis API
class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    rate: number;
    onend: (() => void) | null;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.onend = null;
    }
}

const mockVoices = [
    { name: "Google UK English Male", lang: "en-GB" },
    { name: "Microsoft David - English (United States)", lang: "en-US" },
    { name: "Daniel", lang: "en-US" }
];

describe('TextToSpeechPhrases', () => {
    let mockSpeak: jest.Mock;
    let mockCancel: jest.Mock;
    let mockGetVoices: jest.Mock;

    beforeEach(() => {
        mockSpeak = jest.fn();
        mockCancel = jest.fn();
        mockGetVoices = jest.fn().mockReturnValue(mockVoices);

        (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
        (window as any).speechSynthesis = {
            speak: mockSpeak,
            cancel: mockCancel,
            getVoices: mockGetVoices,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            onvoiceschanged: null,
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('initializes and selects a preferred voice', async () => {
        let voicesReturned = false;
        mockGetVoices.mockImplementation(() => {
            if (!voicesReturned) {
                voicesReturned = true;
                return []; // first callis empty to trigger event listener
            }
            return mockVoices;
        });

        render(<TextToSpeechTextOnly text="Test" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(mockGetVoices).toHaveBeenCalled();
        expect(window.speechSynthesis.addEventListener).toHaveBeenCalledWith(
            'voiceschanged',
            expect.any(Function)
        );
    });

    it('does not call speechSynthesis.speak when voices are not loaded', async () => {
        mockGetVoices.mockReturnValue([]); // Simulate voices not ready

        render(<TextToSpeechTextOnly text="Will not speak" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
        });

        expect(mockSpeak).not.toHaveBeenCalled();
    });


    it('calls speechSynthesis.speak with underscores replaced in text when voices are loaded', async () => {
        mockGetVoices.mockReturnValue(mockVoices);

        render(<TextToSpeechTextOnly text="Hello_world_test" />);

        await act(async () => {
            // Simulate voices loaded and `voiceschanged` firing
            const event = new Event('voiceschanged');
            window.dispatchEvent(event);
            await new Promise(resolve => setTimeout(resolve, 400)); // Allow time for speak
        });

        const utterance = mockSpeak.mock.calls[0][0];
        expect(utterance.text).toBe("Hello world test");
    });

    it('cancels speech when unmounted', async () => {
        const { unmount } = render(<TextToSpeechTextOnly text="Test" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        unmount();
        expect(mockCancel).toHaveBeenCalled();
    });

    it('does not speak when text is empty', async () => {
        render(<TextToSpeechTextOnly text="" />);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(mockSpeak).not.toHaveBeenCalled();
    });
});