import express from 'express';
import Authenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js';
import SongsApiController from '../apicontrollers/SongsApiController.js';

const theSongsApiController = new SongsApiController();

// we need a router to chain them
const router = express.Router({mergeParams : true}); //mergeParams: true => playlists/:playlistId/

//--------------for routing how to handle songs---------------------    
router.get("/", Authenticator.authenticateApi, theSongsApiController.list);
router.post("/", Authenticator.authenticateApi, theSongsApiController.create);
router.put("/:id", Authenticator.authenticateApi, theSongsApiController.update); 
router.delete("/:id", Authenticator.authenticateApi, theSongsApiController.delete);


export default router;