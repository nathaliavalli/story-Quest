"use client";

import "./CompletionPageStyling.css";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "@/CreateRoom/CreateRoomButtonStyles.css";
import useSound from "use-sound";
import Link from "next/link";
import {ExitButton} from "@/HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Player {
    playerNumber: number;
    avatar: string;
    completedPhrases: number;
}

export default function CompletionPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [countdown, setCountdown] = useState(4);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const router = useRouter();
    // Button Sound effects
    const [playCompletedStorySound] = useSound("/sounds/story-completed.mp3");

    useEffect(() => {
        playCompletedStorySound();
        fetchPlayerData();
    }, [playCompletedStorySound]);

    useEffect(() => {
        if (countdown <= 0) {
            setShouldNavigate(true);
        }
    }, [countdown]);

    useEffect(() => {
        if (shouldNavigate) {
            router.push("/");
        }
    }, [shouldNavigate, router]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    async function fetchPlayerData() {
        // Get room ID from URL
        const roomId = window.location.pathname.split('/')[2];
        if (!roomId) return;

        try {
            // 1. Get game data to count completed phrases per player
            const gameDoc = await getDoc(doc(db, "games", roomId));
            const gameData = gameDoc.data();
            const completedPhrases = gameData?.completedPhrases || [];

            // 2. Get all players
            const playersSnapshot = await getDocs(collection(db, "games", roomId, "players"));
            const playersData: Player[] = [];

            playersSnapshot.forEach((doc) => {
                const player = doc.data();
                // Count how many phrases this player contributed
                const playerNumber = player.playerNumber;
                const maxPlayers = gameData?.maxPlayers || 4;
                const playerPhrases = completedPhrases.filter((_: any, index: number) => index % maxPlayers === playerNumber - 1).length;

                playersData.push({
                    playerNumber: player.playerNumber,
                    avatar: player.avatar,
                    completedPhrases: playerPhrases
                });
            });

            setPlayers(playersData.sort((a, b) => b.completedPhrases - a.completedPhrases));
        } catch (error) {
            console.error("Error fetching player data:", error);
        }
    }

    return (
        <div className="compact-overlay-scale">
            <div className="page-container">
            <div className="content-container">
                <div className="align-container">
                    {/* Title */}
                    <div className="ribbon">Story Completed</div>
                    <h1 className="text-color">Great Teamwork!</h1>

                    {/* Stars */}
                    <div className="star-container">
                        <div className="svg-icon">
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={110}
                                height={110}
                                className="icon-spacing"
                            />
                        </div>
                        <div className="svg-icon">
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={150}
                                height={150}
                                className="icon-spacing"
                            />
                        </div>
                        <div className="svg-icon">
                            <Image
                                src="/star-icon.svg"
                                alt="Star icon"
                                width={110}
                                height={110}
                                className="icon-spacing"
                            />
                        </div>
                    </div>

                    {/* Team Summary */}
                    <div className="leaderboard-container">
                        <h2 className="leaderboard-title">Summary</h2>
                        <div className="players-list">
                            {players.map((player) => (
                                <div key={player.playerNumber} className="player-card">
                                    <span className="player-avatar">{player.avatar}</span>
                                    <div className="player-info">
                                        <span className="player-name">Player {player.playerNumber}</span>
                                        <span className="player-lines">
                                            {player.completedPhrases} line{player.completedPhrases !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Countdown and Exit Button */}
                    <div className="button-container">
                        <div className="countdown-container">
                            <motion.div 
                                className="countdown-bubble"
                                animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 3, -3, 0],
                                }}
                                transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "easeInOut"
                                }}
                            >
                                <div className="countdown-text">
                                <span className="countdown-number">{countdown}</span>
                                <span className="countdown-label">sec</span>
                                </div>
                                <div className="countdown-sparkles">
                                {[...Array(2)].map((_, i) => (
                                    <motion.div
                                    key={i}
                                    className="sparkle"
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [0, -10],
                                        x: [0, (i - 0.5) * 8]
                                    }}
                                    transition={{
                                        delay: i * 0.2,
                                        repeat: Infinity,
                                        duration: 1.2,
                                        repeatDelay: 1.5
                                    }}
                                    />
                                ))}
                                </div>
                            </motion.div>
                            <div className="countdown-message">
                                Going home soon...
                            </div>
                        </div>
                        <div className="home-button-container">
                            <Link href="/">
                                <ExitButton/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}