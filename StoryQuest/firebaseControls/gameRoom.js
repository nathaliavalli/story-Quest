/**
 * Firebase Cloud Function: createRoom
 * 
 * This function creates a new game room in Firestore. It generates a unique room ID, 
 * initializes the room with default values, and assigns the authenticated user as the host. 
 * If no authenticated user is present, the host is set as "anonymous".
 * 
 * **Trigger Type:** Callable Cloud Function (`functions.https.onCall`)
 * **Database Used:** Firestore
 * **Collection:** "rooms"
 * **Expected Input:** None
 * **Response:** `{ roomId: string }` on success, or an error message
 */

const functions = require("firebase-functions"); // Firebase Functions SDK
const admin = require("firebase-admin"); // Firebase Admin SDK for Firestore access

// Initialize Firebase Admin SDK (required for Firestore access)
admin.initializeApp();
const db = admin.firestore();

exports.createRoom = functions.https.onCall(async (data, context) => {
    try {
        // Create a new document reference in the "rooms" collection with a unique ID
        const newRoomRef = db.collection("rooms").doc();
        const roomId = newRoomRef.id;

        // Set the initial room data in Firestore
        await newRoomRef.set({
            gameState: "waiting", // Initial game state
            players: {}, // Empty object to store player details
            host: context.auth?.uid || "anonymous", // Assign host, default to "anonymous" if no auth
            storyProgress: {} // Placeholder for story progression data
        });

        // Return the created room ID
        return { roomId };
    } catch (error) {
        console.error("Error creating room:", error); // Log error details
        throw new functions.https.HttpsError("internal", "Error creating room."); // Return generic error to client
    }
});
