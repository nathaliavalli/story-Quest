---
sidebar_position: 1
---

# Backend Documentation

This document describes the backend logic and Firebase Cloud Functions used in the StoryQuest application. These functions are responsible for managing game rooms, players, and the game lifecycle using Firestore.

## Firebase Initialization

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "storyquest-fcdc2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

Environment variables should be stored in a `.env.local` file. Keys prefixed with `NEXT_PUBLIC_` are exposed to the client.


## Cloud Functions Overview

All functions are defined using Firebase's `onCall` HTTP trigger. They use the Firebase Admin SDK to securely interact with Firestore.

### Common Setup

```ts
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
```



## Function: `createRoom`

**Purpose:** Initializes a new game room.

**Trigger Type:** Callable (`functions.https.onCall`)

**Input:** None

**Output:** `{ roomId: string }`

**Logic:**
- Generates a unique document in the `rooms` collection.
- Assigns the current authenticated user as the host.
- Initializes game state and player placeholders.

```ts
exports.createRoom = functions.https.onCall(async (data, context) => {
  const newRoomRef = db.collection("rooms").doc();
  const roomId = newRoomRef.id;

  await newRoomRef.set({
    gameState: "waiting",
    players: {},
    host: context.auth?.uid || "anonymous",
    storyProgress: {}
  });

  return { roomId };
});
```

## Function: `joinRoom`

**Purpose:** Allows a player to join an existing game room.

**Trigger Type:** Callable (`functions.https.onCall`)

**Input:** `{ roomId: string, playerName: string }`

**Output:** `{ success: true, playerId: string }`

**Logic:**
- Verifies the room exists.
- Adds a player to the `players` field using either their UID or a generated guest ID.

```ts
exports.joinRoom = functions.https.onCall(async (data, context) => {
  const { roomId, playerName } = data;
  if (!roomId || !playerName) throw new functions.https.HttpsError("invalid-argument", "Missing fields.");

  const roomRef = db.collection("rooms").doc(roomId);
  const roomDoc = await roomRef.get();

  if (!roomDoc.exists) throw new functions.https.HttpsError("not-found", "Room does not exist.");

  const playerId = context.auth?.uid || `guest_${Math.random().toString(36).substring(2, 8)}`;

  await roomRef.update({
    [`players.${playerId}`]: { name: playerName, role: "player" }
  });

  return { success: true, playerId };
});
```

## Function: `startGame`

**Purpose:** Updates the `gameState` of a room to "started".

**Trigger Type:** Callable (`functions.https.onCall`)

**Input:** `{ roomId: string }`

**Output:** `{ success: true }`

**Logic:**
- Validates that the room exists.
- Updates the `gameState` field to `"started"`.

```ts
exports.startGame = functions.https.onCall(async (data, context) => {
  const { roomId } = data;
  if (!roomId) throw new functions.https.HttpsError("invalid-argument", "Room ID is required.");

  const roomRef = db.collection("rooms").doc(roomId);
  const roomDoc = await roomRef.get();

  if (!roomDoc.exists) throw new functions.https.HttpsError("not-found", "Room does not exist.");

  await roomRef.update({ gameState: "started" });

  return { success: true };
});
```