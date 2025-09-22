import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AnimatedTitle from "@/HomePage/AnimatedTitle";
import '@testing-library/jest-dom';


describe('AnimatedTitle', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<AnimatedTitle />);
        expect(screen.getByTestId('animated-title')).toBeInTheDocument();
    });

    it('displays all letters of "StoryQuest" in order', () => {
        render(<AnimatedTitle />);
        const titleElement = screen.getByTestId('animated-title');
        const spans = titleElement.querySelectorAll('span > span');

        expect(spans.length).toBe(10);

        const letters = Array.from(spans).map(span => span.textContent);
        expect(letters).toEqual(['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't']);
    });


    it('adds wave class after wave delay', async () => {
        render(<AnimatedTitle />);
        const titleElement = screen.getByTestId('animated-title');

        // Fast-forward past initial and wave delays

        console.log('Initial classes:', titleElement.className);
        await act(async () => {
            jest.advanceTimersByTime(500 + 1500);
        });
        console.log('After delay classes:', titleElement.className);

        expect(titleElement.className).toContain('animated-title loaded wave');
    });

    it('removes wave class and adds stopping class after wave end delay', async() => {
        render(<AnimatedTitle />);
        const titleElement = screen.getByTestId('animated-title');

        // Fast-forward through all delays
        console.log('Initial classes:', titleElement.className);
        await act(async () => {
            jest.advanceTimersByTime(500 + 1500+3650);
        });
        console.log('After delay classes:', titleElement.className);

        // Should have loaded and stopping classes, but not wave
        expect(titleElement.className).toContain('animated-title loaded  stopping');
        expect(titleElement.className).not.toContain('wave');
    });


});