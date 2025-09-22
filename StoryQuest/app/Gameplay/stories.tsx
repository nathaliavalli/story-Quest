// stories.tsx



export interface StorySection {
  phrase: string;
  words: {
    [word: string]: {
      image: string;
      x: number;
      y: number;
      effect?: 'spin' | 'pulse' | 'fade' | 'bounce'|'flip'|'sideToSide'|'upAndDown'|'scaleUp'|'none'|'SlideAcrossEffect'; // Add effect property
      width?: number; // Add width property
      height?: number; // Add height property
    };
  };
}

export interface Story {
  title: string;
  backgroundImage: string;
  sections: StorySection[]; // Array of sections
  colorTheme: {
    backgroundColor: string;
    buttonColor: string;
  }
}

const stories: Story[] = [

{
  title: "The Garden Adventure",
  backgroundImage: "garden-background.webp",
  colorTheme: {
    backgroundColor: "#b4fcdc", // Light green
    buttonColor: "#63d2cb", // Teal
  },
  sections: [
    {
      phrase: "Look in the garden, there is a ___.",
      words: {
        mouse: { image: "mouse.svg", x: 30, y: 90, effect: 'flip', width: 80, height: 80 },
        ladybug: { image: "ladybug.svg", x: 30, y: 90, effect: 'sideToSide' },
        bird: { image: "bird.svg", x: 30, y: 90, effect: 'upAndDown' },
        squirrel: { image: "squirrel.svg", x: 30, y: 70, effect: 'fade' },
        boy: { image: "boy.svg", x: 30, y: 90, effect: 'fade', width: 250, height: 280 },
        bear: { image: "bear.svg", x: 30, y: 70, effect: 'fade' }
      },
    },

    {
      phrase: "And playing on the left is a ___.",
      words: {
        mouse: { image: "mouse.svg", x: 20, y: 90, effect: 'flip', width: 80, height: 80 },
        ladybug: { image: "ladybug.svg", x: 20, y: 90, effect: 'sideToSide' },
        bird: { image: "bird.svg", x: 20, y: 90, effect: 'upAndDown' },
        squirrel: { image: "squirrel.svg", x: 20, y: 70, effect: 'fade' },
        boy: { image: "boy.svg", x: 20, y: 90, effect: 'fade', width: 250, height: 280 },
        bear: { image: "bear.svg", x: 20, y: 70, effect: 'fade' }
      },
    },

    {
      phrase: "And near the flowers, we can see a ___.",
      words: {
        bee: { image: "bee.svg", x: 55, y: 50, effect: 'pulse' },
        butterfly: { image: "butterfly.svg",x: 55, y: 45, effect: 'sideToSide' },
        basket: { image: "basket.svg", x: 55, y: 65, effect: 'fade' },
        bear: { image: "bear.svg", x: 55, y: 50, effect: 'flip' },
        bird: { image: "bird.svg", x: 55, y: 50, effect: 'flip' },
        ladybug: { image: "ladybug.svg", x: 55, y: 50, effect: 'pulse' }
      },
    },

    {
      phrase: "To the right we discover a ___.",  
      words: {
        book: { image: "book.svg", x: 90, y: 60, effect: 'pulse' },
        butterfly: { image: "butterfly.svg",x: 90, y: 60, effect: 'sideToSide' },
        bike: { image: "bike.svg", x: 90, y: 60, effect: 'fade' },
        bear: { image: "bear.svg", x: 90, y: 60, effect: 'flip' },
        robot: { image: "robot.svg", x: 90, y: 60, effect: 'flip' , width: 250, height: 280},
        wizard: { image: "wizard.svg", x: 90, y: 60, effect: 'pulse' }
      },
    },


  {
    phrase: "  In the middle of the clouds there is a ___.",
    words: {
      bird: { image: "bird.svg", x: 25, y: 40, effect: 'fade' },
      sun: { image: "sun.svg", x: 25, y: 35, effect: 'scaleUp' },
      moon: { image: "moon.svg", x: 25, y: 38, effect: 'pulse' },
      witch: { image: "witch.svg", x: 25, y: 35, effect: 'scaleUp' },
      balloon: { image: "balloon.svg", x: 25, y: 35, effect: 'fade' },
      rainbow: { image: "rainbow.svg", x: 25, y: 28, effect: 'scaleUp' }
    },
  },

  {
    phrase: "  We talked to a ___.",
    words: {
      bee: { image: "bee.svg", x: 10, y: 10, effect: 'fade' },
      boy: { image: "boy.svg", x: 10, y: 90, effect: 'scaleUp' },
      hero: { image: "hero.svg", x: 10, y: 10, effect: 'pulse' },
      witch: { image: "witch.svg", x: 10, y: 65, effect: 'scaleUp' },
      knight: { image: "knight.svg", x: 10, y: 90, effect: 'fade' },
      robot: { image: "robot.svg", x: 10, y: 10, effect: 'scaleUp' }
    },
  },

  {
    phrase: "  Flying in the sky was a beautiful ___.",
    words: {
      bird: { image: "bird.svg", x: 20, y: 5, effect: 'fade' },
      airplane: { image: "airplane.svg", x: 20, y: 5, effect: 'scaleUp' },
      hero: { image: "hero.svg", x: 20, y: 5, effect: 'pulse', width: 250, height: 280 },
      witch: { image: "witch.svg", x: 20, y: 5, effect: 'scaleUp' },
      butterfly: { image: "butterfly.svg", x: 20, y: 5, effect: 'fade' },
      balloon: { image: "balloon.svg", x: 20, y: 5, effect: 'scaleUp' }
    },
  },
  
  {
    phrase: "By the tree we spotted a ___.",
    words: {
      treasure: { image: "treasure.svg", x: 70, y: 95, effect: 'fade' },
      basket: { image: "basket.svg", x: 70, y: 95, effect: 'scaleUp' },
      squirrel: { image: "squirrel.svg", x: 70, y: 95, effect: 'pulse' },
      boy: { image: "boy.svg", x: 70, y: 95, effect: 'scaleUp' , width: 250, height: 280},
      star: { image: "star.svg", x: 70, y: 95, effect: 'fade' },
      balloon: { image: "balloon.svg", x: 70, y: 95, effect: 'scaleUp' }
    },
  },

  {
    phrase: " Trying to hide in the tree there is a ___.",
    words: {
      bike: { image: "bike.svg", x: 70, y: 45, effect: 'fade' },
      robot: { image: "robot.svg", x: 70, y: 45, effect: 'scaleUp' },
      book: { image: "book.svg", x: 70, y: 45, effect: 'pulse' },
      mouse: { image: "mouse.svg", x: 70, y: 45, effect: 'scaleUp' },
      basket: { image: "basket.svg", x: 70, y: 45, effect: 'fade' },
      ladybug: { image: "ladybug.svg", x: 70, y: 45, effect: 'scaleUp' }
    }
  },

  {
    phrase: "The tree was full of ___.",
    words: {
      apples: { image: "apples.svg", x: 55, y: 0, effect: 'fade' },
      lanterns: { image: "lantern.svg", x: 55, y: 0, effect: 'scaleUp' },
      flowers: { image: "flower.svg", x: 55, y: 0, effect: 'pulse' },
      birds: { image: "birds.svg", x: 55, y: 0, effect: 'scaleUp' },
      oranges: { image: "orange.svg", x: 55, y: 0, effect: 'fade' },
      cherries: { image: "cherry.svg", x: 55, y: 0, effect: 'scaleUp' }
    }
  },

  {
    phrase: "We said bye to the ___ on the left.",
    words: {
      robot: { image: "robot.svg", x: 0, y: 70, effect: 'fade' },
      boy: { image: "boy.svg", x: 0, y: 70, effect: 'scaleUp' , width: 250, height: 280 },
      bee: { image: "bee.svg", x: 0, y: 70, effect: 'pulse' },
      ladybug: { image: "ladybug.svg", x: 0, y: 70, effect: 'scaleUp' },
      star: { image: "star.svg", x: 0, y: 70, effect: 'fade' },
      butterfly: { image: "hero.svg", x: 0, y: 70, effect: 'scaleUp' }
    },
  },

  {
    phrase: "The ___ was happy to see everyone.",
    words: {
      bear: { image: "bear.svg", x: 50, y: 95, effect: 'fade' },
      boy: { image: "boy.svg", x: 50, y: 95, effect: 'scaleUp', width: 250, height: 280  },
      wizard: { image: "wizard.svg", x: 50, y: 95, effect: 'pulse' },
      cow: { image: "cow.svg", x: 50, y: 95, effect: 'scaleUp' },
      star: { image: "star.svg", x: 50, y: 95, effect: 'fade' },
      hero: { image: "hero.svg", x: 50, y: 95, effect: 'scaleUp' , width: 250, height: 280 }
    },
  },

  // ...  can add more sections to the story here
],
},

//NEW STORY - NUMBER 2
{
title: "Walk in the Forest",
backgroundImage: "forest-background.jpg",
colorTheme: {
  backgroundColor: "#ffcccb", // Light red
  buttonColor: "#ff6666", // Coral
  
},
sections: [
  {
    phrase: "In the forest, I look in the sky and see a(n) ___.",
    words: {
      bird: { image: "bird.svg", x: 40, y: 5, effect: 'fade' },
      airplane: { image: "airplane.svg", x: 40, y: 5, effect: 'pulse' },
      helicopter: { image: "helicopter.svg", x: 40, y: 5, effect: 'pulse' },
      hero: { image: "hero.svg", x: 40, y: 5, effect: 'fade' , width: 250, height: 280 },
      cloud: { image: "cloud.svg", x: 40, y: 5, effect: 'scaleUp' },
      sun: { image: "sun.svg", x: 40, y: 5, effect: 'scaleUp' },
    },
  },
  {
    phrase: "On the path there is a ___.",  // New sentence
    words: {
      bear: { image: "bear.svg", x: 40, y: 60, effect: 'pulse' },
      basket: { image: "basket.svg", x: 40, y: 60, effect: 'none' },
      monkey: { image: "monkey.svg", x: 40, y: 60, effect: 'none' },
      squirrel: { image: "squirrel.svg", x: 40, y: 60, effect: 'none' },
      bird: { image: "bird.svg", x: 40, y: 60, effect: 'none' },
      ladybug: { image: "ladybug.svg", x: 40, y: 60, effect: 'none' }
    },
  },

  {
    phrase: "On our left we can see a ___.",  // New sentence
    words: {
      treasure: { image: "treasure.svg", x: 10, y: 70, effect: 'pulse' },
      basket: { image: "basket.svg", x: 10, y: 70, effect: 'none' },
      monkey: { image: "monkey.svg", x: 10, y: 70, effect: 'none' },
      mouse: { image: "mouse.svg", x: 10, y: 70, effect: 'none' },
      dragon: { image: "dragon.svg", x: 10, y: 70, effect: 'none' },
      ladybug: { image: "ladybug.svg", x: 10, y: 70, effect: 'none' }
    },
  },

  {
    phrase: "To our right there is a ___.",  
    words: {
      robot: { image: "robot.svg", x: 90, y: 80, effect: 'pulse' },
      knight: { image: "knight.svg", x: 90, y: 80, effect: 'none' , width: 250, height: 280 },
      butterfly: { image: "butterfly.svg", x: 90, y: 70, effect: 'none' },
      squirrel: { image: "squirrel.svg", x: 90, y: 80, effect: 'none' },
      boy: { image: "boy.svg", x: 90, y: 80, effect: 'none', width: 250, height: 280  },
      ladybug: { image: "ladybug.svg", x: 90, y: 80, effect: 'none' }
    },
  },

  {
    phrase: "We talked to the  ___.",  
    words: {
      robot: { image: "robot.svg", x: 60, y: 80, effect: 'pulse', width: 250, height: 280  },
      knight: { image: "knight.svg", x: 60, y: 80, effect: 'none', width: 250, height: 280  },
      boy: { image: "boy.svg", x: 60, y: 70, effect: 'none' , width: 250, height: 280 },
      witch: { image: "witch.svg", x: 60, y: 80, effect: 'none' },
      bear: { image: "bear.svg", x: 60, y: 80, effect: 'none' },
      wizard: { image: "wizard.svg", x: 60, y: 80, effect: 'none' }
    },
  },

  {
    phrase: "We followed the trail of colorful ___.",
    words: {
      leaves: { "image": "leaves.svg", "x": 40, "y": 90, "effect": "scaleUp" },
      flowers: { "image": "flowers.svg", "x": 40, "y": 80, "effect": "fade" },
      berries: { "image": "berries.svg", "x": 40, "y": 90, "effect": "scaleUp" },
      stones: { "image": "stones.svg", "x": 40, "y": 90, "effect": "flip" },
      feathers: { "image": "feathers.svg", "x": 40, "y": 90, "effect": "upAndDown" },
      mushrooms: { "image": "mushrooms.svg", "x": 40, "y": 90, "effect": "fade" }
    }
  },

  {
    phrase: "It was fun to see the ___ playing.",
    words: {
      squirrel: { "image": "squirrel.svg", "x": 20, "y": 90, "effect": "scaleUp" },
      mouse: { "image": "mouse.svg", "x": 22, "y": 90, "effect": "fade" },
      boy: { "image": "boy.svg", "x": 25, "y": 90, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 20, "y": 90, "effect": "flip" },
      alien: { "image": "alien.svg", "x": 20, "y": 90, "effect": "upAndDown" },
      bee: { "image": "bee.svg", "x": 20, "y": 90, "effect": "sideToSide" }
    }
  },

  {
    phrase: "At the end of the path we see a ___.",
    words: {
      rainbow: { "image": "rainbow.svg", "x": 45, "y": 60, "effect": "scaleUp" },
      mouse: { "image": "mouse.svg", "x": 45, "y": 60, "effect": "fade" },
      treasure: { "image": "treasure.svg", "x": 45, "y": 60, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 45, "y": 60, "effect": "flip" },
      bike: { "image": "bike.svg", "x": 45, "y": 60, "effect": "upAndDown" },
      basket: { "image": "basket.svg", "x": 45, "y": 60, "effect": "sideToSide" }
    }
  },

  {
    phrase: "We spotted a ___.",
    words: {
      rainbow: { "image": "rainbow.svg", "x": 70, "y": 50, "effect": "scaleUp" },
      mouse: { "image": "mouse.svg", "x": 70, "y": 50, "effect": "fade" },
      squirrel: { "image": "squirrel.svg", "x": 70, "y": 50, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 70, "y": 50, "effect": "flip" },
      bear: { "image": "bear.svg", "x": 70, "y": 50, "effect": "upAndDown" },
      bee: { "image": "bee.svg", "x": 70, "y": 50, "effect": "sideToSide" }
    }
  },

  {
    phrase: "The ___ was very happy.",
    words: {
      sun: { "image": "sun.svg", "x": 30, "y": 0, "effect": "scaleUp" },
      mouse: { "image": "mouse.svg", "x": 22, "y": 80, "effect": "fade" },
      squirrel: { "image": "squirrel.svg", "x": 25, "y": 45, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 20, "y": 40, "effect": "flip" },
      monkey: { "image": "monkey.svg", "x": 60, "y": 60, "effect": "upAndDown" },
      knight: { "image": "knight.svg", "x": 60, "y": 85, "effect": "pulse" }
    }
  },

  {
    phrase: "On top of the trees was a ___.",
    words: {
      monkey: { "image": "monkey.svg", "x": 80, "y": 5, "effect": "scaleUp" },
      squirrel: { "image": "squirrel.svg", "x": 80, "y": 5, "effect": "fade" },
      treasure: { "image": "treasure.svg", "x": 80, "y": 5, "effect": "pulse" },
      robot: { "image": "robot.svg", "x": 80, "y": 5, "effect": "flip" },
      bike: { "image": "bike.svg", "x": 80, "y": 5, "effect": "flip" },
      basket: { "image": "basket.svg", "x": 80, "y": 5, "effect": "fade" }
    }
  },

  {
    phrase: "The ___ was bouncing in the bush.", 
    words: {
      boy: {image: "boy.svg", x: 80, y: 60, effect: 'scaleUp'},
      squirrel: {image: "squirrel.svg", x: 65, y: 60, effect: 'upAndDown'},
      mouse: {image: "mouse.svg", x: 65, y: 60, effect: 'upAndDown'},
      monkey: {image: "monkey.svg", x: 65, y: 60, effect: 'upAndDown'},
      ladybug: {image: "ladybug.svg", x: 65, y: 60, effect: 'upAndDown'},
      bear: {image: "bear.svg", x: 65, y: 60, effect: 'upAndDown'}
    }
  }
  ],
},

// NEW STORY - NUMBER 3
  {
    title: "Space Adventure",
    backgroundImage: "space-background.svg",
    colorTheme: {
      backgroundColor: "#0a0a23", // Deep space blue
      buttonColor: "#4d79ff", // Cosmic blue
    },
    sections: [
      {
        phrase: "We are travelling through space and saw a(n) ___.",
        words: {
          planet: { image: "planet.svg", x: 80, y: 5, effect: 'spin' },
          comet: { image: "comet.svg", x: 80, y: 5, effect: 'sideToSide' },
          astronaut: { image: "astronaut.svg", x: 80, y: 5, effect: 'bounce' },
          car: { image: "car.svg", x: 80, y: 5, effect: 'flip' },
          alien: { image: "alien.svg", x: 80, y: 5, effect: 'fade' },
          star: { image: "star.svg", x: 80, y: 5, effect: 'pulse' }
        },
      },
      {
        phrase: "On the moon, we discovered a(n) ___.",
        words: {
          flag: { image: "flag.svg", x: 20, y: 20, effect: 'pulse' },
          rock: { image: "rock.svg", x: 20, y: 20, effect: 'scaleUp' },
          cow: { image: "cow.svg", x: 20, y: 20, effect: 'scaleUp' },
          treasure: { image: "treasure.svg", x: 20, y: 20, effect: 'pulse' },
          robot: { image: "robot.svg", x: 20, y: 20, effect: 'pulse' },
          alien: { image: "alien.svg", x: 20, y: 20, effect: 'fade' }
        },
      },

      {
        phrase: "The captain told us to watch out for a floating ___.",
        words: {
          balloon: { image: "balloon.svg", x: 10, y: 5, effect: 'pulse' },
          rock: { image: "rock.svg", x: 10, y: 5, effect: 'scaleUp' },
          cow: { image: "cow.svg", x: 10, y: 5, effect: 'scaleUp' },
          treasure: { image: "treasure.svg", x: 10, y: 5, effect: 'pulse' },
          robot: { image: "robot.svg", x: 10, y: 5, effect: 'pulse' },
          wizard: { image: "wizard.svg", x: 10, y: 5, effect: 'fade' }
        },
      },


      {
        phrase: "We see a colorful ___.",
        words: {
          balloo: { image: "balloon.svg", x: 40, y: 25, effect: 'pulse' },
          rainbow: { image: "rainbow.svg", x: 40, y: 25, effect: 'scaleUp' },
          comet: { image: "comet.svg", x: 40, y: 20, effect: 'scaleUp' },
          treasure: { image: "treasure.svg", x: 40, y: 25, effect: 'pulse' },
          robot: { image: "robot.svg", x: 40, y: 20, effect: 'pulse' },
          planet: { image: "planet.svg", x: 40, y: 20, effect: 'fade' }
        },
      },


      {
        phrase: "Suddenly, something flew by us. It was a(n) ___.",
        words: {
          UFO: { image: "ufo.svg", x: 50, y: 50, effect: 'scaleUp' },
          book: { image: "book.svg", x: 50, y: 50, effect: 'fade' },
          rocket: { image: "rocket.svg", x: 50, y: 50, effect: 'upAndDown' },
          airplane: { image: "airplane.svg", x: 50, y: 50, effect: 'scaleUp' },
          shootingStar: { image: "shootingstar.svg", x: 50, y: 50, effect: 'sideToSide' },
          spaceDragon: { image: "dragon.svg", x: 50, y: 50, effect: 'bounce' }
        }
      },

      {
        phrase: "Under the moon, we spotted a(n) ___.",
        words: {
          spaceDog: { image: "spacedog.svg", x: 15, y: 80, effect: 'bounce' },
          astronaut: { image: "astronaut.svg", x: 15, y: 80, effect: 'none' },
          wizard: { image: "wizard.svg", x: 15, y: 80, effect: 'spin' },
          treasure: { image: "treasure.svg", x: 15, y: 80, effect: 'pulse' },
          robot: { image: "robot.svg", x: 15, y: 80, effect: 'pulse' },
          alien: { image: "alien.svg", x: 15, y: 80, effect: 'fade' }
        },
      },


      {
        phrase: "Space is a place full of ___(s).",
        words: {
          star: { image: "star.svg", x: 90, y: 60, effect: 'bounce' },
          stones: { image: "stones.svg", x: 90, y: 60, effect: 'none' },
          feathers: { image: "feathers.svg", x: 90, y: 60, effect: 'spin' },
          book: { image: "book.svg", x: 90, y: 60, effect: 'pulse' },
          planet: { image: "planet.svg", x: 90, y: 60, effect: 'pulse' },
          UFO: { image: "ufo.svg", x: 90, y: 60, effect: 'fade' }
        },
      },

      {
        phrase: "Hiding on the right we spotted a(n) ___.",
        words: {
          UFO: { image: "ufo.svg", x: 90, y: 90, effect: 'scaleUp' },
          spaceDog: { image: "spaceDog.svg", x: 90, y: 90, effect: 'fade' },
          rocket: { image: "rocket.svg", x: 90, y: 90, effect: 'upAndDown' },
          airplane: { image: "airplane.svg", x: 90, y: 90, effect: 'scaleUp' },
          planet: { image: "planet.svg", x: 90, y: 90, effect: 'sideToSide' },
          spaceDragon: { image: "dragon.svg", x: 90, y: 90, effect: 'bounce' }
        }
      },

      {
        phrase: "We were happy to see the ___.",
        words: {
          UFO: { image: "ufo.svg", x: 90, y: 90, effect: 'scaleUp' },
          spaceCat: { image: "spacecat.svg", x: 90, y: 90, effect: 'fade' },
          wizard: { image: "wizard.svg", x: 90, y: 90, effect: 'upAndDown' },
          astronaut: { image: "astronaut.svg", x: 90, y: 90, effect: 'scaleUp' },
          planet: { image: "planet.svg", x: 90, y: 90, effect: 'sideToSide' },
          hero: { image: "hero.svg", x: 90, y: 90, effect: 'bounce' }
        }
      },


      {
        phrase: "We also said hello to a(n) ___.",
        words: {
          alien: { image: "alien.svg", x: 5, y: 90, effect: 'pulse' },
          robot: { image: "robot.svg", x: 5, y: 90, effect: 'sideToSide' },
          spaceCat: { image: "spacecat.svg", x: 5, y: 90, effect: 'fade' },
          spaceDog: { image: "spacedog.svg", x: 5, y: 90, effect: 'bounce' },
          astronaut: { image: "astronaut.svg", x: 5, y: 90, effect: 'none' },
          wizard: { image: "wizard.svg", x: 5, y: 90, effect: 'spin' }
        }
      },

      {
        phrase: "We asked for directions from a(n) ___.",
        words: {
          alien: { image: "alien.svg", x: 60, y: 90, effect: 'pulse' },
          robot: { image: "robot.svg", x: 60, y: 90, effect: 'sideToSide' },
          spaceCat: { image: "spacecat.svg", x: 60, y: 90, effect: 'fade' },
          spaceDog: { image: "spacedog.svg", x: 60, y: 90, effect: 'bounce' },
          astronaut: { image: "astronaut.svg", x: 60, y: 90, effect: 'none' },
          wizard: { image: "wizard.svg", x: 60, y: 90, effect: 'spin' }
        }
      },

      {
        phrase: "Then we said goodbye to the ___.",
        words: {
          UFO: { image: "ufo.svg", x: 60, y: 70, effect: 'pulse' },
          robot: { image: "robot.svg", x: 60, y: 70, effect: 'sideToSide' },
          witch: { image: "witch.svg", x: 60, y: 70, effect: 'fade' },
          spaceDog: { image: "spacedog.svg", x: 60, y: 70, effect: 'bounce' },
          hero: { image: "hero.svg", x: 60, y: 70, effect: 'none' },
          cow: { image: "cow.svg", x: 60, y: 70, effect: 'spin' }
        }
      }


    ],
  },

// NEW STORY - NUMBER 4
{
title: "Under the Sea",
backgroundImage: "ocean-background.png",
colorTheme: {
backgroundColor: "#0a0a23", // Deep space blue
buttonColor: "#4d79ff", // Cosmic blue
},
sections: [
  
{
phrase: "It is a beautiful day under the ocean, on our right we see a(n) ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 80, y: 40, effect: 'scaleUp' },
  redfish: { image: "redfish.svg", x: 80, y: 40, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 80, y: 40, effect: 'sideToSide' },
  diver: { image: "diver.svg", x: 80, y: 40, effect: 'flip' },
  seaHorse: { image: "seahorse.svg", x: 80, y: 40, effect: 'fade' },
  pinkFish: { image: "pinkfish.svg", x: 80, y: 40, effect: 'pulse' }
},
},
{
phrase: "We can see a colorful ___.",
words: {
  mermaid: { image: "mermaid.svg", x: 50, y: 40, effect: 'pulse' },
  coral: { image: "coral.svg", x: 50, y: 40, effect: 'scaleUp' },
  jellyfish: { image: "jellyfish.svg", x: 50, y: 40, effect: 'scaleUp' },
  treasure: { image: "treasure.svg", x: 50, y: 40, effect: 'pulse' },
  robot: { image: "robot.svg", x: 50, y: 40, effect: 'pulse' },
  submarine: { image: "submarine.svg", x: 50, y: 40, effect: 'fade' }
},
},
{
phrase: "On our left we see a(n) ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 10, y: 30, effect: 'spin' },
  redfish: { image: "redfish.svg", x: 10, y: 30, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 10, y: 30, effect: 'bounce' },
  diver: { image: "diver.svg", x: 10, y: 30, effect: 'flip' },
  seaHorse: { image: "seahorse.svg", x: 10, y: 30, effect: 'fade' },
  pinkFish: { image: "pinkfish.svg", x: 10, y: 30, effect: 'pulse' }
}
},


{
phrase: "At the bottom of the ocean we discovered a(n) ___.",
words: {
  seastar: { image: "seastar.svg", x: 40, y: 99, effect: 'scaleUp' },
  jellyfish: { image: "jellyfish.svg", x: 40, y: 99, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 40, y: 99, effect: 'bounce' },
  diver: { image: "diver.svg", x: 40, y: 99, effect: 'flip' },
  seaHorse: { image: "seahorse.svg", x: 40, y: 99, effect: 'fade' },
  seashell: { image: "seashell.svg", x: 40, y: 99, effect: 'pulse' }
}
},

{
  phrase: "We also spotted a ___.",
  words: {
    mermaid: { image: "mermaid.svg", x: 30, y: 5, effect: 'spin' },
    jellyfish: { image: "jellyfish.svg", x: 30, y: 5, effect: 'sideToSide' },
    shark: { image: "shark.svg", x: 30, y: 5, effect: 'bounce' },
    diver: { image: "diver.svg", x: 30, y: 5, effect: 'flip' },
    seaHorse: { image: "seahorse.svg", x: 30, y: 5, effect: 'fade' },
    seashell: { image: "seashell.svg", x: 30, y: 5, effect: 'pulse' }
  }
  },


  {
    phrase: "By the seaweed trying to hide there is a(n) ___.",
    words: {
      whale: { image: "seastar.svg", x: 70, y: 50, effect: 'spin' },
      jellyfish: { image: "jellyfish.svg", x: 70, y: 50, effect: 'sideToSide' },
      orangefish: { image: "orangefish.svg", x: 70, y: 50, effect: 'bounce' },
      diver: { image: "diver.svg", x: 70, y: 50, effect: 'flip' },
      seaHorse: { image: "seahorse.svg", x: 70, y: 50, effect: 'fade' },
      seashell: { image: "seashell.svg", x: 70, y: 50, effect: 'pulse' }
    }
    },


    {
      phrase: " Near the surface there is a(n) ___.",
      words: {
        whale: { image: "whale.svg", x: 80, y: 0, effect: 'scaleUp' },
        jellyfish: { image: "jellyfish.svg", x: 80, y: 0, effect: 'sideToSide' },
        orangefish: { image: "orangefish.svg", x: 80, y: 0, effect: 'bounce' },
        diver: { image: "diver.svg", x: 80, y: 0, effect: 'flip' },
        seaHorse: { image: "seahorse.svg", x: 80, y: 0, effect: 'fade' },
        shark: { image: "shark.svg", x: 80, y: 0, effect: 'pulse' }
      }
      },

{
phrase: "We said hello to a(n) ___.",
words: {
  bluefish: { image: "bluefish.svg", x: 10, y: 20, effect: 'pulse' },
  shark: { image: "shark.svg", x: 10, y: 20, effect: 'sideToSide' },
  orangefish: { image: "orangefish.svg", x: 10, y: 20, effect: 'bounce' },
  diver: { image: "diver.svg", x: 10, y: 20, effect: 'flip' },
  seaHorse: { image: "seahorse.svg", x: 10, y: 20, effect: 'fade' },
  whale: { image: "whale.svg", x: 10, y: 20, effect: 'pulse' }
}
},

{
phrase: " The ___ was swimming up and down.",
words: {
  bluefish: { image: "bluefish.svg", x: 30, y: 30, effect: 'upAndDown' },
  shark: { image: "shark.svg", x: 30, y: 30, effect: 'upAndDown' },
  orangefish: { image: "orangefish.svg", x: 30, y: 30, effect: 'upAndDown' },
  mermaid: { image: "mermaid.svg", x: 30, y: 30, effect: 'upAndDown' },
  seaHorse: { image: "seahorse.svg", x: 30, y: 30, effect: 'upAndDown' },
  pinkfish: { image: "pinkfish.svg", x: 30, y: 30, effect: 'upAndDown' }
}
},

{
  phrase: " The ___ was happy to see us.",
  words: {
    jellyfish: { image: "jellyfish.svg", x: 55, y: 20, effect: 'spin' },
    shark: { image: "shark.svg", x: 55, y: 20, effect: 'sideToSide' },
    seastar: { image: "seastar.svg", x: 55, y: 20, effect: 'bounce' },
    diver: { image: "diver.svg", x: 55, y: 20, effect: 'flip' },
    robot: { image: "robot.svg", x: 55, y: 20, effect: 'fade' },
    whale: { image: "whale.svg", x: 55, y: 20, effect: 'pulse' }
  }
  },

  {
  phrase: " We wondered why the ___ was under the sea.",
  words: {
    squirrel: { image: "squirrel.svg", x: 10, y: 50, effect: 'fade' },
    treasure: { image: "treasure.svg", x: 10, y: 50, effect: 'pulse' },
    flag: { image: "flag.svg", x: 10, y: 50, effect: 'scaleUp' },
    rock: { image: "rock.svg", x: 10, y: 50, effect: 'flip' },
    knight: { image: "knight.svg", x: 10, y: 50, effect: 'fade' },
    cow: { image: "cow.svg", x: 10, y: 50, effect: 'pulse' }
  }
  },

  {phrase: " We said goodbye to the ___.",
    words: {
      bluefish: { image: "bluefish.svg", x: 70, y: 90, effect: 'spin' },
      coral: { image: "coral.svg", x: 70, y: 90, effect: 'sideToSide' },
      seastar: { image: "seastar.svg", x: 70, y: 90, effect: 'bounce' },
      diver: { image: "diver.svg", x: 70, y: 90, effect: 'flip' },
      seaHorse: { image: "seahorse.svg", x: 70, y: 90, effect: 'fade' },
      seashell: { image: "seashell.svg", x: 70, y: 90, effect: 'pulse' }
    }
    },

],
},

];

export default stories;