'use client';

import React, {useEffect, useRef, useState} from 'react';
import './AnimatedTitleStyles.css';
import useQuickTextToSpeech from "@/Components/useQuickTextToSpeech";
import useButtonFeedback from "@/Components/useButtonClickSounds";


const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null); // reference of div that contains title
    const [isLoaded, setIsLoaded] = useState(false); // if title is loaded in
    const [isWaving, setIsWaving] = useState(false); // if waving animation is triggered
    const [isStopping, setIsStopping] = useState(false); // state for drop effect

    // Characters of the title "StoryQuest"
    const title = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];

    const {speak} = useQuickTextToSpeech();
    const {buttonHandler} = useButtonFeedback();

    const handleClick = () => {
        buttonHandler('none', "StoryQuest", speak);
    };

    // Delay times in ms
    const initialDelay= 500;
    const waveDelay = 1500;
    const waveEndDelay = 3650;
    const stopDuration = 100;

    useEffect(() => {

        const initialTimer =setTimeout(() => {
            if (divRef.current) {
                setIsLoaded(true); // title is loaded in
            }
        }, initialDelay);

        // Trigger wave effect after initial animation, after 1500ms
        const waveTimer = setTimeout(() => {
            setIsWaving(true); // Activate waving animation
        }, waveDelay);

        // Waves through the letters once
        const waveEndTimer = setTimeout(() => {
            setIsStopping(true); // Start stop animation
            setTimeout(() => {
            setIsWaving(false); // turn off waving animation to prevent motion sickness
            setIsStopping(true);
        }, stopDuration);
    }, waveEndDelay);

        // cleanup on timers to avoid memory leaks
        return () => {
            clearTimeout(initialTimer);
            clearTimeout(waveTimer);
            clearTimeout(waveEndTimer);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className={`animated-title ${isLoaded ? 'loaded' : ''} ${isWaving ? 'wave' : ''} ${isStopping ? 'stopping' : ''}`}
            data-testid="animated-title"
            aria-label="StoryQuest"
            onClick={handleClick}
        >
            {title.map((char, index) => (
                <span key={index} aria-hidden="true">
                    <span>{char}</span>
                </span>
            ))}
        </div>
    );
};

export default AnimatedTitle;