---
sidebar_position: 2
---

# System Block Diagram

![System Block Diagram](/img/system-block-diagram-4_29_25.png)
*Figure 1: System block diagram showcasing interaction between users, frontend, and backend.*


## Diagram of Gameplay Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Firestore
    participant CloudFunctions
    
    %% Room Creation Flow
    User->>UI: Selects story/difficulty/players
    UI->>Firestore: Creates new room document
    Firestore->>CloudFunctions: Triggers roomCreated function
    CloudFunctions->>Firestore: Initializes game state
    
    %% Player Joining Flow
    User->>UI: Chooses avatar
    UI->>Firestore: Updates player profile (avatar)
    UI->>Firestore: Adds player to room.players[]
    Firestore->>All Clients: Broadcasts player list update
    
    %% Gameplay Flow
    loop Each Turn
        User->>UI: Selects AAC symbol
        UI->>Firestore: Records selection in game state
        Firestore->>CloudFunctions: Checks turn completion
        CloudFunctions->>Firestore: Updates currentTurn/phrase
        Firestore->>All Clients: Updates game board
    end
    
    %% Game Completion Flow
    CloudFunctions->>Firestore: Marks game as completed
    Firestore->>UI: Triggers celebration screen
    UI->>User: Shows results with avatars
    UI->>Firestore: Archives game data
```


## Technology Requirements

### Frontend / Client-side
The frontend uses a Next.js framework (TypeScript) hosted with Firebase. The UI is styled using TailwindCSS, and FramerMotion (smooth animation). The word bank will have appropriate buttons that will look like ARASAAC, a widely accepted AAC Keyboard variations.

### Backend / Server-Side

The backend uses Firebase for cloud functions and data storage. Firebase cloud functions are used to handle game logic, while a Cloud Firestore NoSQL database securely stores user data and game material (stories and questions). Firebase also facilitates user authentication for joining the room with the correct QR code. 
