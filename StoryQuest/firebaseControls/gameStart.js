/**
 * Firebase Cloud Function: startGame
 * 
 * This function starts a game session in a specified room by updating 
 * the Firestore database. It ensures that the room exists before changing 
 * the `gameState` to "started".
 * 
 *  **Trigger Type:** Callable Cloud Function (`functions.https.onCall`)
 *  **Database Used:** Firestore
 *  **Collection:** "rooms"
 *  **Expected Input:** `{ roomId: string }`
 *  **Response:** `{ success: true }` on success, or an error message
 */

const functions = require("firebase-functions"); // Firebase Functions SDK
const admin = require("firebase-admin"); // Firebase Admin SDK for Firestore access

// Initialize Firebase Admin SDK (required for Firestore access)
admin.initializeApp();
const db = admin.firestore();

exports.startGame = functions.https.onCall(async (data, context) => {
    const { roomId } = data;

    //Validate input: Ensure roomId is provided
    if (!roomId) {
        throw new functions.https.HttpsError("invalid-argument", "Room ID is required.");
    }

    // Reference the room document in Firestore
    const roomRef = db.collection("rooms").doc(roomId);
    const roomDoc = await roomRef.get();

    // Check if the room exists in the database
    if (!roomDoc.exists) {
        throw new functions.https.HttpsError("not-found", "Room does not exist.");
    }

    try {
        // Update the game state to "started"
        await roomRef.update({ gameState: "started" });

        // Return success response to the frontend
        return { success: true };
    } catch (error) {
        console.error("Error starting game:", error); // Log the actual error
        throw new functions.https.HttpsError("internal", "Error starting game."); // Return a generic error to the client
    }
});
