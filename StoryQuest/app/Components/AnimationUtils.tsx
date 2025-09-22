//StoryQuest/app/Components/AnimationUtils.tsx

// Effects.tsx
import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';

// SpinEffect: Rotates the children element continuously.
export const SpinEffect = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
    >
      {children}
    </motion.div>
);

// WalkCycleEffect: Alternates between two images to simulate walking.
export const WalkCycleEffect = ({ image1, image2, duration = 0.4 }: { image1: string; image2: string; duration?: number }) => (
    <motion.div
        animate={{ opacity: [1, 0, 1] }} // Fades one image out and the other in
        transition={{ repeat: Infinity, duration: duration, ease: 'linear' }}
        style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}
    >
      <img
          src={image1}
          alt="Walk frame 1"
          style={{ position: 'absolute', width: '100px', height: '100px', opacity: 1 }}
      />
      <img
          src={image2}
          alt="Walk frame 2"
          style={{ position: 'absolute', width: '100px', height: '100px', opacity: 0 }}
      />
    </motion.div>
);

// PulseEffect: Scales the children element in and out, creating a pulsing effect.
export const PulseEffect = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }} // Scales from 1 to 1.1 and back to 1
    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} // Repeats infinitely, 1.5 seconds per cycle, smooth transition
  >
    {children}
  </motion.div>
);

// FadeEffect: Fades the children element in.
export const FadeEffect = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }} // Starts with opacity 0 (invisible)
    animate={{ opacity: 1 }} // Animates to opacity 1 (fully visible)
    transition={{ duration: 1 }} // 1 second fade-in
  >
    {children}
  </motion.div>
);

// SideToSideEffect: Moves the children element continuously side to side.
export const SideToSideEffect = ({ children, distance = 50 }: { children: React.ReactNode; distance?: number }) => (
  <motion.div
    animate={{ x: [-distance, distance, -distance] }} // Move left, right, left
    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} // Repeat infinitely, 2 seconds per cycle
  >
    {children}
  </motion.div>
);

// UpAndDownEffect: Moves the children element continuously up and down.
export const UpAndDownEffect = ({ children, distance = 50 }: { children: React.ReactNode; distance?: number }) => (
  <motion.div
    animate={{ y: [-distance, distance, -distance] }} // Move up, down, up
    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} // Repeat infinitely, 2 seconds per cycle
  >
    {children}
  </motion.div>
);

// ScaleUpEffect: Scales the children element up from a smaller size.
export const ScaleUpEffect = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }} // Starts at half size and invisible
    animate={{ scale: 1, opacity: 1 }} // Scales to full size and visible
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// BounceEffect: Creates a bouncing effect by scaling and translating the children element.
export const BounceEffect = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      y: [0, -10, 0], // Move up and down slightly
    }}
    transition={{
      repeat: Infinity,
      duration: 1.2,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

// FlipEffect: Flips the children element along the Y-axis.
export const FlipEffect = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{ rotateY: 360 }} // Rotates around the Y-axis
    transition={{ duration: 1, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);


// SlideAcrossEffect: Slides the children element from a specified start position to a specified end position, centered vertically.
export const SlideAcrossEffect = ({ children, distance = 350 }: { children: React.ReactNode; distance?: number }) => (
  <motion.div
    animate={{ x: [-distance, distance] }} 
    transition={{ repeat: 0, duration: 3, ease: 'easeInOut' }} // Repeat infinitely, 2 seconds per cycle
  >
    {children}
  </motion.div>
);
  