import { check, body, validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse.js";
import MongoosePlaylistManager from '../managers/MongoosePlaylistManager.js';


class PlaylistsApiController {
	constructor() {
		this.PlaylistManager = new MongoosePlaylistManager();	//connects controller and manager
	}
	/**
	 * Converts to POJO
	 */
	includeData(data) {	//washer
		// Here we can choose what data to include,
		return {
			id: data.id,
            name: data.name,
            genre: data.genre,
            createdAt: data.createdAt,
		}
	}

	/**
	 * Playlist List.
	 * 
	 * @returns {Object}
	 */
	list = async (req, res) => {
		try {
			const allPlaylists = await this.PlaylistManager.fetchPlaylists(req.user);
			if (allPlaylists.length > 0) {
				const playlists = allPlaylists.map(document => this.includeData(document)); 
				return apiResponse.successResponseWithData(res, "Operation success", playlists);
			} else {
				return apiResponse.successResponseWithData(res, "Operation success", []); 	//return empty array so it will not be an error
			}
			//});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.errorResponse(res, err);
		}
	}

	/**
	 * Playlist Detail.
	 * 
	 * @param {string}      id
	 * 
	 * @returns {Object}
	 */
	detail = async (req, res) => {
		try {
			const playlist = await this.PlaylistManager.getPlaylistById(req.user, req.params.id);
			if (playlist !== null) {
				let playlistData = this.includeData(playlist);
				return apiResponse.successResponseWithData(res, "Operation success", playlistData);
			} else {
				return apiResponse.successResponseWithData(res, "Operation success", {});	// could instead return null
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.errorResponse(res, err);
		}
	}

	/**
	 * Playlist Create.
	 * 
	 * @param {string}      name 
	 * @param {string}      genre
	  * 
	 * @returns {Object}
	 */
	create = [
		// a list of callbacks
		check("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
		check("genre", "Body may be empty.").trim(),	
		body("*").escape(),
		async (req, res) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());	
				} else {
					//Save playlist.
					const createdPlaylist = await this.PlaylistManager.addPlaylist(req.user, req.body.name, req.body.genre);
					if (!createdPlaylist) {
						return apiResponse.errorResponse(res, 'Could not create playlist');
					} else {
						let playlistData = this.includeData(createdPlaylist);
						return apiResponse.successResponseWithData(res, "Playlist add Success.", playlistData);
					};
				}
			} catch (err) {
				//throw error in json response with status 500. 
				return apiResponse.errorResponse(res, err);
			}
		}
	]

	/**
	 * Playlist Update.
	 * 
	 * @param {string}      name 
	 * @param {string}      genre
	  * 
	 * @returns {Object}
	 */
	update = [		
		check("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
		check("genre", "Body may be empty.").trim(),
		body("*").escape(),
		async (req, res) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
					//pick the user.id
					const foundPlaylist = await this.PlaylistManager.getPlaylistById(req.user, req.params.id);
					
					if (foundPlaylist === null) {
						return apiResponse.notFoundResponse(res, "Playlist not exists with this id or You are not authorized ");
					} else {
						//update playlist.
						const playlist = {
							name: req.body.name,
							genre: req.body.genre,
							id: req.params.id
						};

						const updatedPlaylist = await this.PlaylistManager.changePlaylist(req.user, playlist);
						if (!updatedPlaylist) {
							return apiResponse.errorResponse(res, 'Could not update playlist');
						} else {
							let playlistData = this.includeData(playlist);
							return apiResponse.successResponseWithData(res, "Playlist update Success.", playlistData);
						}
					}
				}
			} catch (err) {
				//throw error in json response with status 500. 
				return apiResponse.errorResponse(res, err);
			}
		}
	]

	/**
	 * Playlist Delete.
	 * 
	 * @param {string}      id
	 * 
	 * @returns {Object}
	 */
	delete = [
		async (req, res) => {
			try {
				const foundPlaylist = await this.PlaylistManager.getPlaylistById(req.user, req.params.id);
				if (foundPlaylist === null) {
					return apiResponse.notFoundResponse(res, "Playlist not exists with this id");
				} else {
					//delete playlist.
					const removedPlaylist = await this.PlaylistManager.removePlaylist(req.user, req.params.id);
					if (!removedPlaylist) {
						return apiResponse.errorResponse(res, 'Could not delete the playlist');
					} else {
						return apiResponse.successResponse(res, "Playlist delete Success.");
					}

				}

			} catch (err) {
				//throw error in json response with status 500. 
				return apiResponse.errorResponse(res, err);
			}
		}
	]
}

export default PlaylistsApiController;