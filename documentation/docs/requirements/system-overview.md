---
sidebar_position: 1
---

# System Overview

## Project Abstract

StoryQuest is a web-based, tablet-friendly collaborative storytelling game designed to enhance social inclusion and 
communication skills, particularly for children who use Augmentative and Alternative Communication (AAC). The game is 
inspired by "Mad Libs", and leverages cloze phrases—a proven technique in speech therapy 
that helps improve word recall, literacy, and structured communication. The design ensures that AAC users play an 
essential role in the team, preventing social exclusion and encouraging meaningful participation. A built-in AAC-friendly 
interface eliminates the need for excessive screen switching, providing seamless accessibility. The interface also dynamically indicates when a child is selecting their answer, supporting clear turn-taking and engagement 
for all players.

## Conceptual Design

### Frontend (Client-Side)
**Framework:**
- Next.js (React + TypeScript) – Provides an interactive and maintainable UI.

**Styling & UI Components:**
- TailwindCSS – Ensures responsive, accessible, and customizable styling.
- Framer Motion – Smooth animations and transitions for enhanced engagement.

### Backend (Server-Side & Data Handling)
- **Firebase Firestore (NoSQL Database)** – Stores game data, story progress, and room states in real-time.
- **Firebase Cloud Functions** – Manages game logic, including answer validation and player interactions

### Deployment & Project Management
- **Hosting:** Firebase Cloud Hosting – Ensures fast and scalable deployment.
- **Version Control & Documentation:** GitHub & Docusaurus – Tracks project progression, documentation, and CI/CD pipeline management.

## Background

Many current tools on the market are geared towards engaging AAC users, such as the AAC Language Lab<sup>1</sup> or AssistiveWare<sup>2</sup>.
The AAC Language Lab has web-based games based on stages of learning, and requires a subscription model to use. AssistiveWare has specific apps 
for specific AAC communication devices. Much of their apps are targeted towards helping the younger generation of AAC 
users more comfortable with using assistive technology. There is a gap in the market for learning games based in collaboration between AAC users 
and non-AAC users.

StoryQuest aims to create a collaborative environment for AAC and non-AAC users to engage in play. 
In a study by Schwartz et al.,<sup>3</sup> the 31 preschool children with significant developmental disabilities who learned to use Picture 
Exchange Communication Systems to communicate with adults after 11 months, also learned to communicate with peers without disabilities 
after an additional 3 months of intervention in integrated, play-based activities. Social interactions for development remains important 
at the grade-school level. 

1. AAC Language Lab: https://aaclanguagelab.com/activities
2. AssistiveWare: https://www.assistiveware.com/products
3. Schwartz IS, Garfinkle AN, Bauer J. The picture exchange communication system communicative outcomes for young children with disabilities. Topics in Early Childhood Special Education. 1998;18:144–159. [Google Scholar]
