/**
 * Firebase Cloud Function: joinRoom
 * 
 * This function allows a player to join an existing game room in Firestore.
 * It verifies the provided `roomId`, ensures the room exists, and adds the 
 * player to the room's `players` collection. If the user is authenticated, 
 * their UID is used; otherwise, a guest ID is generated.
 * 
 * **Trigger Type:** Callable Cloud Function (`functions.https.onCall`)
 * **Database Used:** Firestore
 * **Collection:** "rooms"
 * **Expected Input:** `{ roomId: string, playerName: string }`
 * **Response:** `{ success: true, playerId: string }` on success, or an error message
 */

const functions = require("firebase-functions"); // Firebase Functions SDK
const admin = require("firebase-admin"); // Firebase Admin SDK for Firestore access

// Initialize Firebase Admin SDK (required for Firestore access)
admin.initializeApp();
const db = admin.firestore();

exports.joinRoom = functions.https.onCall(async (data, context) => {
    const { roomId, playerName } = data;

    // Validate input: Ensure roomId and playerName are provided
    if (!roomId) {
        throw new functions.https.HttpsError("invalid-argument", "Room ID is required.");
    }

    if (!playerName) {
        throw new functions.https.HttpsError("invalid-argument", "Player name is required.");
    }

    // Reference the room document in Firestore
    const roomRef = db.collection("rooms").doc(roomId);
    const roomDoc = await roomRef.get();

    // Check if the room exists in the database
    if (!roomDoc.exists) {
        throw new functions.https.HttpsError("not-found", "Room does not exist.");
    }

    // Generate a player ID (Use UID if authenticated, else create a guest ID)
    const playerId = context.auth?.uid || `guest_${Math.random().toString(36).substring(2, 8)}`;

    try {
        // Add the player to the room's "players" object in Firestore
        await roomRef.update({
            [`players.${playerId}`]: { name: playerName, role: "player" }
        });

        // Return success response with playerId
        return { success: true, playerId };
    } catch (error) {
        console.error("Error joining room:", error); // Log the actual error
        throw new functions.https.HttpsError("internal", "Error joining room."); // Return a generic error to the client
    }
});
