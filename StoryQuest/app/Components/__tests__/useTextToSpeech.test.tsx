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
        // Android (Google voices)
        {
            name: "Google UK English Male",
            lang: "en-GB",
            voiceURI: "google-uk",
            localService: true,
            default: false
        },
        {
            name: "Google US English",
            lang: "en-US",
            voiceURI: "google-us",
            localService: true,
            default: false
        },
        // Windows (Microsoft voices)
        {
            name: "Microsoft David",
            lang: "en-US",
            voiceURI: "ms-david",
            localService: true,
            default: false
        },
        {
            name: "Microsoft Zira",
            lang: "en-US",
            voiceURI: "ms-zira",
            localService: true,
            default: false
        },
        // macOS (Apple voices)
        {
            name: "Daniel",
            lang: "en-GB",
            voiceURI: "mac-daniel",
            localService: true,
            default: false
        },
        {
            name: "Alex",
            lang: "en-US",
            voiceURI: "mac-alex",
            localService: true,
            default: false
        },
        // Fallback English voices
        {
            name: "",
            lang: "en-US",
            voiceURI: "fallback-us",
            localService: true,
            default: false
        },
        {
            name: "",
            lang: "en-GB",
            voiceURI: "fallback-gb",
            localService: true,
            default: false
        },
        // Ultimate fallback
        {
            name: "",
            lang: "",
            voiceURI: "ultimate-fallback",
            localService: true,
            default: true
        }
    ] as SpeechSynthesisVoice[];

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
