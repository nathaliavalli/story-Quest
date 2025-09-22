import React from 'react';
import { render, act } from '@testing-library/react';
import TextToSpeechTextOnly from '@/Components/TextToSpeechTextOnly';

// Mocking SpeechSynthesis APIs
class MockSpeechSynthesisUtterance {
    constructor(public text: string) {}
    onend = jest.fn();
    onerror = jest.fn();
    voice = null;
    rate = 1;
    pitch = 1;
    volume = 1;
}


const mockSpeak = jest.fn();
const mockCancel = jest.fn();
const mockGetVoices = jest.fn();
jest.useFakeTimers()
const originalSpeechSynthesis = window.speechSynthesis;

beforeAll(() => {
    Object.defineProperty(window, 'speechSynthesis', {
        value: {
            speak: mockSpeak,
            cancel: mockCancel,
            getVoices: mockGetVoices,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            onvoiceschanged: null,
        },
        writable: true,
    });

    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        value: MockSpeechSynthesisUtterance,
        writable: true,
    });
});

afterAll(() => {
    Object.defineProperty(window, 'speechSynthesis', {
        value: originalSpeechSynthesis,
    });
});

describe('TextToSpeechTextOnly', () => {
    const mockOnComplete = jest.fn();
    const mockText = "This is a test sentence";
    let capturedUtterance: MockSpeechSynthesisUtterance | null = null;
    let voicesChangedCallback: () => void = () => {};

    beforeEach(() => {
        jest.clearAllMocks();
        capturedUtterance = null;
        mockGetVoices.mockReturnValue([]);
        mockSpeak.mockImplementation((utterance) => {
            capturedUtterance = utterance;
            utterance.onend = jest.fn(() => mockOnComplete());
            return utterance;
        });

        // Setup event listener mock
        window.speechSynthesis.addEventListener = jest.fn((_, cb) => {
            voicesChangedCallback = cb as () => void;
        });
    });

    it('should handle voices loading via event', async () => {
        mockGetVoices.mockReturnValue([]);

        render(
            <TextToSpeechTextOnly text={mockText} onComplete={mockOnComplete} />
        );

        expect(mockSpeak).not.toHaveBeenCalled();
        mockGetVoices.mockReturnValue([{
            voiceURI: 'Test Voice',
            name: 'Test Voice',
            lang: 'en-US',
            localService: true,
            default: true
        }]);

        const utterance = new SpeechSynthesisUtterance(mockText);
        window.speechSynthesis.speak(utterance);

        await act(async () => {
            voicesChangedCallback();
            jest.runAllTimers();
        });

        expect(mockSpeak).toHaveBeenCalledTimes(1);
        expect(capturedUtterance?.text).toBe(mockText);
    });

    it('should handle unsupported speech synthesis', () => {
        const originalSpeechSynthesis = window.speechSynthesis;
        Object.defineProperty(window, 'speechSynthesis', { value: undefined });

        const { container } = render(
            <TextToSpeechTextOnly text={mockText} onComplete={mockOnComplete} />
        );

        expect(container).toBeEmptyDOMElement();
        expect(mockOnComplete).not.toHaveBeenCalled();

        Object.defineProperty(window, 'speechSynthesis', { value: originalSpeechSynthesis });
    });

    it('should initialize and wait for voices', () => {
        mockGetVoices.mockReturnValue([]);

        render(
            <TextToSpeechTextOnly text={mockText} onComplete={mockOnComplete} />
        );

        expect(window.speechSynthesis.addEventListener).toHaveBeenCalledWith(
            'voiceschanged',
            expect.any(Function)
        );
    });

    it('should clean up on unmount', async () => {
        mockGetVoices.mockReturnValue([{ name: 'Test Voice', lang: 'en-US' }]);

        const { unmount } = render(
            <TextToSpeechTextOnly text={mockText} onComplete={mockOnComplete} />
        );

        await act(async () => {
            jest.advanceTimersByTime(100);
        });

        unmount();

        expect(mockCancel).toHaveBeenCalledTimes(1);
        expect(window.speechSynthesis.removeEventListener).toHaveBeenCalled();
    });
});
