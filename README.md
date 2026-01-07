## Playlist System (School project)
A **full-stack** school project using: **React** and **Vite** for the front-end, **Node.js, Express and MongoDB** for back-end.
Playlist System is a full-stack application where users can create, view, and manage playlists.  

## Features

- User authentication
- Seed, Create, update and delete playlists 
- Seed, Create, update and delete sonngs
- View all playlists for current user
- REST API for backend

## Installation

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/BckAndrea/playlist-system.git
cd playlist-system

# Backend setup
cd ./Backend-PlaylistsApi
npm install
npm start 

# Frontend setup
cd ./Frontend-PlaylistsApp
npm install
npm run dev
```

## Teck stack
**Frontend:**  
- **React** – UI library for building the app interface  
- **Vite** – Fast frontend build tool and development   server  
- **CSS** – Styling  

**Backend:**  
- **Node.js & Express** – Server and REST API framework  
- **MongoDB & Mongoose** – Database and object modeling  
- **Passport.js** – Authentication middleware  
  - **passport-local** – Local username/password strategy  
  - **passport-jwt** – JWT-based authentication  
  - **passport-local-mongoose** – Simplifies user model setup with Mongoose  
- **jsonwebtoken (JWT)** – Token generation and verification  
- **express-validator** – Input validation  
- **cors** – Cross-origin request handling  
- **dotenv** – Environment variables management  
- **morgan** – HTTP request logging  