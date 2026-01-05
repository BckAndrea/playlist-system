import express from 'express';
import Authenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js'
import PlaylistsApiController from '../apicontrollers/PlaylistsApiController.js'

const thePlaylistsApiController = new PlaylistsApiController();

// we need a router to chain them
const router = express.Router();

//--------------for routing - how to handle playlists---------------------
//      /api/playlists
//router.get("/", thePlaylistsApiController.list)     //api standarn get is a fetch, och lista
router.get("/", Authenticator.authenticateApi, thePlaylistsApiController.list);
router.post("/", Authenticator.authenticateApi, thePlaylistsApiController.create);
router.put("/:id", Authenticator.authenticateApi, thePlaylistsApiController.update); 
router.delete("/:id", Authenticator.authenticateApi, thePlaylistsApiController.delete);


export default router;