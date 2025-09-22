//StoryQuest/app/Components/useAACSounds.ts

import useSound from 'use-sound';
import { useRef } from 'react';

//Hook for playing AAC keyboard button sounds, uses mp3 files for each button
const useAACSounds = () => {
    const audioElements = useRef<Record<string, HTMLAudioElement>>({});
    const soundBaseUrl = '/aacSounds/';
    const volumeLevel = 2; // increased mp3 sound volume

    const loadSound = (word: string, url: string) => {
    // Create audio element on first use
    if (!audioElements.current[word]) {
        audioElements.current[word] = new Audio(url);
        audioElements.current[word].preload = 'auto';
        }
    };

    // sound hooks for MP3 files
    const [playApples] = useSound(`${soundBaseUrl}apples.mp3`, { volume: volumeLevel });
    const [playAirplane] = useSound(`${soundBaseUrl}airplane.mp3`, { volume: volumeLevel });
    const [playAlien] = useSound(`${soundBaseUrl}alien.mp3`, { volume: volumeLevel });
    const [playAstronaut] = useSound(`${soundBaseUrl}astronaut.mp3`, { volume: volumeLevel });
    const [playBalloon] = useSound(`${soundBaseUrl}balloon.mp3`, { volume: volumeLevel });
    const [playBasket] = useSound(`${soundBaseUrl}basket.mp3`, { volume: volumeLevel });
    const [playBear] = useSound(`${soundBaseUrl}bear.mp3`, { volume: volumeLevel });
    const [playBee] = useSound(`${soundBaseUrl}bee.mp3`, { volume: volumeLevel });
    const [playBird] = useSound(`${soundBaseUrl}bird.mp3`, { volume: volumeLevel });
    const [playBirds] = useSound(`${soundBaseUrl}birds.mp3`, { volume: volumeLevel });
    const [playBook] = useSound(`${soundBaseUrl}book.mp3`, { volume: volumeLevel });
    const [playBoy] = useSound(`${soundBaseUrl}boy.mp3`, { volume: volumeLevel });
    const [playButterfly] = useSound(`${soundBaseUrl}butterfly.mp3`, { volume: volumeLevel });
    const [playCar] = useSound(`${soundBaseUrl}car.mp3`, { volume: volumeLevel });
    const [playCherries] = useSound(`${soundBaseUrl}cherries.mp3`, { volume: volumeLevel });
    const [playCloud] = useSound(`${soundBaseUrl}cloud.mp3`, { volume: volumeLevel });
    const [playComet] = useSound(`${soundBaseUrl}comet.mp3`, { volume: volumeLevel });
    const [playCow] = useSound(`${soundBaseUrl}cow.mp3`, { volume: volumeLevel });
    const [playFlag] = useSound(`${soundBaseUrl}flag.mp3`, { volume: volumeLevel });
    const [playFlowers] = useSound(`${soundBaseUrl}flowers.mp3`, { volume: volumeLevel });
    const [playHelicopter] = useSound(`${soundBaseUrl}helicopter.mp3`, { volume: volumeLevel });
    const [playHero] = useSound(`${soundBaseUrl}hero.mp3`, { volume: volumeLevel });
    const [playLadybug] = useSound(`${soundBaseUrl}ladybug.mp3`, { volume: volumeLevel });
    const [playLanterns] = useSound(`${soundBaseUrl}lanterns.mp3`, { volume: volumeLevel });
    const [playMonkey] = useSound(`${soundBaseUrl}monkey.mp3`, { volume: volumeLevel });
    const [playMoon] = useSound(`${soundBaseUrl}moon.mp3`, { volume: volumeLevel });
    const [playMouse] = useSound(`${soundBaseUrl}mouse.mp3`, { volume: volumeLevel });
    const [playOranges] = useSound(`${soundBaseUrl}orange.mp3`, { volume: volumeLevel });
    const [playPlanet] = useSound(`${soundBaseUrl}planet.mp3`, { volume: volumeLevel });
    const [playRainbow] = useSound(`${soundBaseUrl}rainbow.mp3`, { volume: volumeLevel });
    const [playRobot] = useSound(`${soundBaseUrl}robot.mp3`, { volume: volumeLevel });
    const [playRock] = useSound(`${soundBaseUrl}rock.mp3`, { volume: volumeLevel });
    const [playRocket] = useSound(`${soundBaseUrl}rocket.mp3`, { volume: volumeLevel });
    const [playShootingStar] = useSound(`${soundBaseUrl}shootingStar.mp3`, { volume: volumeLevel });
    const [playSpaceCat] = useSound(`${soundBaseUrl}spaceCat.mp3`, { volume: volumeLevel });
    const [playSpaceDog] = useSound(`${soundBaseUrl}spaceDog.mp3`, { volume: volumeLevel });
    const [playSpaceDragon] = useSound(`${soundBaseUrl}spaceDragon.mp3`, { volume: volumeLevel });
    const [playSquirrel] = useSound(`${soundBaseUrl}squirrel.mp3`, { volume: volumeLevel });
    const [playStar] = useSound(`${soundBaseUrl}star.mp3`, { volume: volumeLevel });
    const [playSun] = useSound(`${soundBaseUrl}sun.mp3`, { volume: volumeLevel });
    const [playTreasure] = useSound(`${soundBaseUrl}treasure.mp3`, { volume: volumeLevel });
    const [playUFO] = useSound(`${soundBaseUrl}UFO.mp3`, { volume: volumeLevel });
    const [playWitch] = useSound(`${soundBaseUrl}witch.mp3`, { volume: volumeLevel });
    const [playWizard] = useSound(`${soundBaseUrl}wizard.mp3`, { volume: volumeLevel });
    const [playMushrooms] = useSound(`${soundBaseUrl}mushrooms.mp3`, { volume: volumeLevel });

    // play function for each word
    const soundMap: Record<string, () => void> = {
        apples: playApples,
        airplane: playAirplane,
        alien: playAlien,
        astronaut: playAstronaut,
        balloon: playBalloon,
        basket: playBasket,
        bear: playBear,
        bee: playBee,
        bird: playBird,
        birds: playBirds,
        book: playBook,
        boy: playBoy,
        butterfly: playButterfly,
        car: playCar,
        cherries: playCherries,
        cloud: playCloud,
        comet: playComet,
        cow: playCow,
        flag: playFlag,
        flowers: playFlowers,
        helicopter: playHelicopter,
        hero: playHero,
        ladybug: playLadybug,
        lanterns: playLanterns,
        monkey: playMonkey,
        moon: playMoon,
        mouse: playMouse,
        oranges: playOranges,
        planet: playPlanet,
        rainbow: playRainbow,
        robot: playRobot,
        rock: playRock,
        rocket: playRocket,
        shootingStar: playShootingStar,
        spaceCat: playSpaceCat,
        spaceDog: playSpaceDog,
        spaceDragon: playSpaceDragon,
        squirrel: playSquirrel,
        star: playStar,
        sun: playSun,
        treasure: playTreasure,
        UFO: playUFO,
        witch: playWitch,
        wizard: playWizard,
        mushrooms: playMushrooms
    };

    const playSound = (word: string) => {
    // iOS requires this to happen synchronously during the click handler
    try {
      const audio = audioElements.current[word];
      if (audio) {
        audio.currentTime = 0; // Rewind if already playing
        audio.play().catch(e => console.error("Audio play failed:", e));
      }
    } catch (error) {
      console.error("Sound error:", error);
    }
  };

    return { playSound, loadSound };
};

export default useAACSounds;