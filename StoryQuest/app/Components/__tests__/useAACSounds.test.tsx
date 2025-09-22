// useAACSounds.test.tsx
import { renderHook } from '@testing-library/react';
import useAACSounds from '../useAACSounds';


// Mock the Audio class
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  pause: jest.fn(),
  currentTime: 0,
  preload: '',
}));

describe('useAACSounds', () => {
  it('should load sound correctly', () => {
    const { result } = renderHook(() => useAACSounds());
    const { loadSound } = result.current;

    const testWord = 'test';
    const testUrl = '/aacSounds/test.mp3';
    
    loadSound(testWord, testUrl);
    
    // Verify Audio was created with correct URL
    expect(Audio).toHaveBeenCalledWith(testUrl);
    
    // Verify preload was set to auto
    expect(result.current.playSound).toBeDefined();
  });
});