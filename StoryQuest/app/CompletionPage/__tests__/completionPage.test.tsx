import { render, screen } from '@testing-library/react';
import CompletionPage from '@/CompletionPage/page';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));
jest.mock('use-sound', () => () => [jest.fn()]);

// Mock next/image for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock the ExitButton component
jest.mock('../../HomePage/HomePageButtons', () => ({
  ExitButton: jest.fn().mockImplementation(({ testId }) => (
      <button data-testid={testId || 'exit-button'}>Exit</button>
  ))
}));

describe('CompletionPage', () => {
  test('renders completion page with titles, stars, and exit button', () => {
    render(<CompletionPage />);

    // titles
    expect(screen.getByText('Story Completed')).toBeInTheDocument();
    expect(screen.getByText('Great Teamwork!')).toBeInTheDocument();

    // star icons are rendered
    const stars = screen.getAllByAltText('Star icon');
    expect(stars).toHaveLength(3);

    //  exit button
    const exitButton = screen.getByTestId('exit-button');
    expect(exitButton).toBeInTheDocument();
    expect(exitButton).toHaveTextContent('Exit');  });
});