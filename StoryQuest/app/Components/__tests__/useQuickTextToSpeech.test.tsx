import { renderHook, act } from "@testing-library/react";
import useQuickTextToSpeech from "../useQuickTextToSpeech";

// Mocks
const mockSpeak = jest.fn();
const mockCancel = jest.fn();

let voicesMock: SpeechSynthesisVoice[] = [];

class MockSpeechSynthesisUtterance {
    text: string;
    voice: SpeechSynthesisVoice | null;
    lang: string;

    constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.lang = "en-US";
    }
}

beforeEach(() => {
    voicesMock = [
        {
            name: "Google UK English Male",
            lang: "en-GB",
            voiceURI: "voice1",
            localService: true,
            default: true
        } as SpeechSynthesisVoice,
        {
            name: "Daniel",
            lang: "en-GB",
            voiceURI: "voice2",
            localService: true,
            default: false
        } as SpeechSynthesisVoice
    ];

    // Global mocks
    (window as any).speechSynthesis = {
        getVoices: jest.fn(() => voicesMock),
        speak: mockSpeak,
        cancel: mockCancel,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    };

    (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

    jest.useFakeTimers(); // For simulating any async logic
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

const triggerVoicesChanged = () => {
    const addListenerMock = (window.speechSynthesis.addEventListener as jest.Mock);
    const call = addListenerMock.mock.calls.find(call => call[0] === 'voiceschanged');
    if (call) {
        const callback = call[1];
        callback();
    }
};

describe("useQuickTextToSpeech", () => {
    it("should initialize and set isReady to true", () => {
        const { result } = renderHook(() => useQuickTextToSpeech());

        act(() => {
            triggerVoicesChanged();
            jest.runAllTimers();
        });

        expect(result.current.isReady).toBe(true);
    });

    it("should select a preferred voice", () => {
        renderHook(() => useQuickTextToSpeech());
        expect(window.speechSynthesis.getVoices).toHaveBeenCalled();
    });

    it("should call speak() and use speechSynthesis", () => {
        const { result } = renderHook(() => useQuickTextToSpeech());

        act(() => {
            triggerVoicesChanged();
            jest.runAllTimers();
        });

        act(() => {
            result.current.speak("Hello world");
        });

        expect(mockSpeak).toHaveBeenCalled();
        const utteranceArg = mockSpeak.mock.calls[0][0];
        expect(utteranceArg.text).toBe("Hello world");
    });

    it("should call stop() and cancel speech", () => {
        const { result } = renderHook(() => useQuickTextToSpeech());

        act(() => {
            result.current.stop();
        });

        expect(mockCancel).toHaveBeenCalled();
    });
});
