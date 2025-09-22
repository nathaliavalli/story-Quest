---
sidebar_position: 2
---
# Integration Tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input 
was provided via mock objects and results verified via mock objects.

## Purpose
Integration testing verifies that different components of our application work together as expected. Unlike 
unit tests that test individual components, integration tests ensure that the flow between use cases and their 
interconnected features functions correctly.

## Integration with Use Cases
1. **Game Setup -> User sets up game**
   - Links Use Case 1 (Room Management-Setting up a new room) with Use Case 2 (Room Management-Joining a room)
   - Tested that:
     - Room created successfully with sounds, settings, and information sent to backend.
     - Room QR codes are properly generated and validated
     - Player limits are enforced

2. **Player Setup -> Game Start Flow**
   - Links Use Case 3 (Accessibility & AAC) with Use Case 4 (Cloze Phraze Education - User Chooses an Answer) and Use Case 5 (Collaboration - Users Take Turns Answering a Question)
   - Tested that:
     - Player avatars are properly chosen and stored
     - AAC keyboard is properly initialized for each player and tracks turns with greying out feature
     - Updated based off user input and tracks amount of time taken for the user.

4. **Settings and Difficulty Integration**
   - Links Use Case 6 (Difficulty Scaling) with ongoing gameplay
   - Tests that:
     - Difficulty changes properly affect question complexity
     - Game state maintains consistency during difficulty changes

## Example Integration Test Flow

Here's an example of how we test the Room Creation → Player Join flow:

```typescript
describe('Room Creation and Join Flow', () => {
  it('should allow player to join after room creation', async () => {
    // Test complete flow from room creation to successful join
    // 1. Create room
    // 2. Generate room code
    // 3. Join with code
  });
});
```
