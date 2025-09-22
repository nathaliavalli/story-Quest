'use client';
import React, {useState} from 'react';
import "./MusicSliderStyling.css";
import Image from "next/image";
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";

export const HomePageBackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false); // Switch from music note to "play/stop and slider" display
    const [volume, setVolume] = useState(50); // volume range
    const {speak} = useQuickTextToSpeech(); // useTextToSpeech hook
    const { buttonHandler, isSpeaking } = useButtonFeedback();

    const handlePlayMusic = () => {
        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.play().catch(error => {
                console.log("Error with autoplay:", error);
            });
            setIsPlaying(true);
        }
    };

    const handleStopMusic = () => {
        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Resets playback to the start
            setIsPlaying(false);
        }
    }

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);

        const audio = document.getElementById("HomePageBackgroundMusic") as HTMLAudioElement;
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    const handleClick = (text:string) => {
        buttonHandler('none', text, speak);
    };

    return (
        <div>
            {!showControls && (
                <div>
                    <button onClick={() => {
                        setShowControls(true)
                        handleClick("Music")
                    }}>
                        <Image
                            src="/music-note.svg"
                            alt="Music icon"
                            width={30}
                            height={30}
                            className="icon-spacing"
                        />
                        Music
                    </button>
                </div>
            )}

            {showControls && (
                <div className="volume-container">
                    {isPlaying ? (
                        <button onClick={handleStopMusic}>
                            <Image
                                src="/stop-music.svg"
                                alt="Stop music icon"
                                width={30}
                                height={30}
                                className="icon-spacing"
                            />
                            Stop Music</button>
                    ) : (
                        <button onClick={handlePlayMusic}>
                            <Image
                                src="/play-music.svg"
                                alt="Play music icon"
                                width={30}
                                height={30}
                                className="icon-spacing"
                            />
                            Play Music</button>
                    )}

                    <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange}/>

                </div>
            )}

            <audio id="HomePageBackgroundMusic" loop>
                <source src="/sounds/StoryQuestHomePageMusic.mp3" type="audio/mp3"/>
                Your browser does not support the audio element.
            </audio>

        </div>
    );
}