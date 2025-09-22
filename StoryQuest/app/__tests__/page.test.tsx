import {render, screen, fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import AnimatedTitle from "@/HomePage/AnimatedTitle";
import Footer from '../../app/page';
import { CreateButton, JoinButton, TemporaryTestingGameButton} from "@/HomePage/HomePageButtons";
import Home from "../../app/page";

describe('HomePage', () => {
    // Test that the animated title renders correctly
    it('renders the text of the animated title correctly', () => {
        render(<AnimatedTitle/>);

        // Get text of title that was rendered
        const spans = screen.getAllByText(/./); // Matches any non-empty text from rendered text

        // Correct title characters
        const characters = ['S', 't', 'o', 'r', 'y', 'Q', 'u', 'e', 's', 't'];

        // Check that each character rendered matches with the correct character list of the title.
        spans.forEach((span, index) => {
            expect(span).toHaveTextContent(characters[index]); // Check if each span has the correct character
        });
    })

    jest.useFakeTimers();

    it('initially does not have loaded or wave classes', () => {
        render(<AnimatedTitle />);

        const container = screen.getByTestId('animated-title');
        expect(container).not.toHaveClass('loaded');
        expect(container).not.toHaveClass('wave');
    });

    it('adds loaded class after initial delay', () => {
        render(<AnimatedTitle />);

        act(() => {
            jest.advanceTimersByTime(500); // initialDelay
        });

        const container = screen.getByTestId('animated-title');
        expect(container).toHaveClass('loaded');
        expect(container).not.toHaveClass('wave');
    });

    it('adds wave class after wave delay', () => {
        render(<AnimatedTitle />);

        act(() => {
            jest.advanceTimersByTime(1500); // waveDelay
        });

        const container = screen.getByTestId('animated-title');
        expect(container).toHaveClass('loaded');
        expect(container).toHaveClass('wave');
    });

    it('cleans up timers on unmount', () => {
        const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
        const { unmount } = render(<AnimatedTitle />);

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);
        clearTimeoutSpy.mockRestore();
    });

    // Test that the copyright renders correctly
    it('renders the copyright text correctly', () => {
        render(<Footer/>);

        // Check that the correct copyright text is rendered on the homepage
        const copyrightText = screen.getByText(/Copyright © 2025 StoryQuest/i);
        expect(copyrightText).toBeInTheDocument();
    });

    // Test that the create button renders correctly
    it('renders create button correctly', () => {
        render(<CreateButton/>)
        // Get button element
        const button = screen.getByRole('button', {name: /create/i});
        // Button element is rendered
        expect(button).toBeInTheDocument();
        // Button has the text 'Create'
        expect(button).toHaveTextContent('Create');
    })

    // Test that the join button renders correctly
    it('renders join button correctly', () => {
        render(<JoinButton/>)
        // Get button element
        const button = screen.getByRole('button', {name: /join/i});
        // Button element is rendered
        expect(button).toBeInTheDocument();
        // Button has the text 'Join'
        expect(button).toHaveTextContent('Join');
    })
});