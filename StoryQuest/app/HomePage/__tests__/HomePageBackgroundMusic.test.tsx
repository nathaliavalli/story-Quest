import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HomePageBackgroundMusic } from '@/HomePage/HomePageBackgroundMusic';
import '@testing-library/jest-dom';

// Mocking Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('HomePageBackgroundMusic', () => {
    let mockPlay: jest.Mock;
    let mockPause: jest.Mock;
    let audioElement: HTMLAudioElement;

    beforeEach(() => {
        mockPlay = jest.fn().mockImplementation(() => Promise.resolve());
        mockPause = jest.fn();

        // Mocking audio element
        audioElement = document.createElement('audio');
        audioElement.play = mockPlay;
        audioElement.pause = mockPause;

        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            return id === 'HomePageBackgroundMusic' ? audioElement : null;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the music note button initially', () => {
        render(<HomePageBackgroundMusic />);
        expect(screen.getByText('Music')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Music icon' })).toBeInTheDocument();
    });

    it('shows controls when music note is clicked', () => {
        render(<HomePageBackgroundMusic />);
        fireEvent.click(screen.getByText('Music'));

        expect(screen.getByRole('slider')).toBeInTheDocument();
        expect(screen.getByText('Play Music')).toBeInTheDocument();
    });

    it('toggles between play and stop buttons', async () => {
        render(<HomePageBackgroundMusic />);
        fireEvent.click(screen.getByText('Music'));

        // show & click play button
        const playButton = screen.getByText('Play Music');
        expect(playButton).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(playButton);
        });
        expect(mockPlay).toHaveBeenCalled();

        // show & click stop button
        expect(screen.getByText('Stop Music')).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText('Stop Music'));
        });
        expect(mockPause).toHaveBeenCalled();
    });

    it('handles volume change correctly', () => {
        render(<HomePageBackgroundMusic />);
        fireEvent.click(screen.getByText('Music'));

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '75' } });

        expect(slider).toHaveValue('75');
    });

});