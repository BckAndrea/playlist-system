import express from 'express';
import authRouter from './auth.js';
import playlistRouter from './playlists.js';
import songRouter from './songs.js';

// app is a singleton, ie same for all
const app = express();
// No router here, use chain them

app.use("/auth/", authRouter);
app.use("/playlists", playlistRouter);
app.use("/playlists/:playlistId/songs", songRouter);

// If needed
export default app;