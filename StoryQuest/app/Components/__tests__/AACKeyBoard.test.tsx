import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AACKeyboard from '../AACKeyboard';
import { motion } from 'framer-motion';

// Mock Framer Motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    button: jest.fn(({ children, onClick, whileHover, whileTap, ...props }) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ))
  }
}));

describe('AACKeyboard', () => {
  const mockOnSelect = jest.fn();
  const mockSymbols = [
    { word: 'Eat', image: 'eat.png' },
    { word: 'Drink', image: 'drink.png' },
    { word: 'Play', image: 'play.png' },
    { word: 'Sleep', image: 'sleep.png' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<AACKeyboard onSelect={mockOnSelect} symbols={mockSymbols} />);
    
    expect(screen.getByText('AAC Keyboard')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(mockSymbols.length);
    
    mockSymbols.forEach(symbol => {
      expect(screen.getByText(symbol.word)).toBeInTheDocument();
    });
  });

  it('applies custom background and button colors', () => {
    const customBg = '#ffcccb';
    const customBtn = '#ff6666';
    
    render(
      <AACKeyboard 
        onSelect={mockOnSelect} 
        symbols={mockSymbols} 
        backgroundColor={customBg}
        buttonColor={customBtn}
      />
    );
    
    const container = screen.getByText('AAC Keyboard').parentElement;
    expect(container).toHaveStyle(`background-color: ${customBg}`);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveStyle(`background-color: ${customBtn}`);
    });
  });

  it('renders images with correct alt text', () => {
    render(<AACKeyboard onSelect={mockOnSelect} symbols={mockSymbols} />);
    
    mockSymbols.forEach(symbol => {
      const img = screen.getByAltText(symbol.word);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', symbol.image);
    });
  });

  it('has proper accessibility attributes', () => {
    render(<AACKeyboard onSelect={mockOnSelect} symbols={mockSymbols} />);
    
    mockSymbols.forEach(symbol => {
      const button = screen.getByLabelText(`Select ${symbol.word}`);
      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  it('renders correct grid layout', () => {
    render(<AACKeyboard onSelect={mockOnSelect} symbols={mockSymbols} />);
    
    const grid = screen.getByText('AAC Keyboard').nextElementSibling;
    expect(grid).toHaveClass('grid-cols-2');
  });

  it('handles empty symbols array gracefully', () => {
    render(<AACKeyboard onSelect={mockOnSelect} symbols={[]} />);
    
    expect(screen.getByText('AAC Keyboard')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});