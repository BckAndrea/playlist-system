import { check, body, validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse.js";
import MongooseSongManager from "../managers/MongooseSongManager.js";


class SongsApiController {
	constructor() {
		this.SongManager = new MongooseSongManager();
	}
	/**
	 * Converts to POJO
	 */
	includeData(data) {	
		return {
			id: data.id,
            name: data.name,
            artist: data.artist,
            releaseYear: data.releaseYear,
            createdAt: data.createdAt,
		}
	}

	/**
	 * Song List.
	 * 
	 * @returns {Object}
	 */
	list = async (req, res) => {
		try {
			const allSongs = await this.SongManager.fetchSongs(req.params.playlistId);
			if (allSongs.length > 0) {
				const songs = allSongs.map(document => this.includeData(document));
				return apiResponse.successResponseWithData(res, "Operation success", songs);
			} else {
				return apiResponse.successResponseWithData(res, "Operation success", []);
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.errorResponse(res, err);
		}
	}

	/**
	 * Song Detail.
	 * 
	 * @param {string}      id
	 * 
	 * @returns {Object}
	 */
	detail = async (req, res) => {
		try {
			const song = await this.SongManager.getSongById(req.params.playlistId, req.params.id);
			if (song !== null) {
				let songData = this.includeData(song);
				return apiResponse.successResponseWithData(res, "Operation success", songData);
			} else {
				return apiResponse.successResponseWithData(res, "Operation success", {});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.errorResponse(res, err);
		}
	}

	/**
	 * Song Create.
	 * 
	 * @param {string}      name 
	 * @param {string}      artist
     * @param {number}      releaseYear
	  * 
	 * @returns {Object}
	 */
	create = [
		check("name", "Name must not be empty.").isLength({ min: 1 }).trim(),				
		check("artist", "Artist may not be empty.").isLength({ min: 1 }).trim(),			
        check("releaseYear", "may be empty").trim(),
		body("*").escape(),
		async (req, res) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
					//Save song.
					const createdSong = await this.SongManager.addSong({id: req.params.playlistId}, req.body.name, req.body.artist, req.body.releaseYear);	//för denna playlist, denna bodyname...
					if (!createdSong) {
						return apiResponse.errorResponse(res, 'Could not create song');
					} else {
						let songData = this.includeData(createdSong);
						return apiResponse.successResponseWithData(res, "Song add Success.", songData);
					};
				}
			} catch (err) {
				//throw error in json response with status 500. 
				return apiResponse.errorResponse(res, err);
			}
		}
	]

	/**
	 * Song Update.
	 * 
	 * @param {string}      name 
	 * @param {string}      artist
     * @param {number}      releaseYear
	  * 
	 * @returns {Object}
	 */
	update = [
		check("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
		check("artist", "Artist may not be empty.").isLength({ min: 1 }).trim(),
        check("releaseYear", "may be empty").trim(),
		body("*").escape(),
		async (req, res) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
					const foundSong = await this.SongManager.getSongById({id: req.params.playlistId}, req.params.id);	
					
					if (foundSong === null) {
						return apiResponse.notFoundResponse(res, "Song not exists with this id or You are not authorized ");
					} else {
						//update song.
						const song = {
							name: req.body.name,
							artist: req.body.artist,
                            releaseYear: req.body.releaseYear,
							id: req.params.id
						};

						const updatedSong = await this.SongManager.changeSong({id: req.params.playlistId}, song);
						if (!updatedSong) {
							return apiResponse.errorResponse(res, 'Could not update song');
						} else {
							let songData = this.includeData(song);
							return apiResponse.successResponseWithData(res, "Song update Success.", songData);
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
	 * Song Delete.
	 * 
	 * @param {string}      id
	 * 
	 * @returns {Object}
	 */
	delete = [
		async (req, res) => {
			try {
				const foundSong = await this.SongManager.getSongById({id: req.params.playlistId}, req.params.id);
				if (foundSong === null) {
					return apiResponse.notFoundResponse(res, "Song not exists with this id");
				} else {
					//delete song.
					const removedSong = await this.SongManager.removeSong({id: req.params.playlistId}, req.params.id);
					if (!removedSong) {
						return apiResponse.errorResponse(res, 'Could not delete the song');
					} else {
						return apiResponse.successResponse(res, "Song delete Success.");
					}

				}

			} catch (err) {
				//throw error in json response with status 500. 
				return apiResponse.errorResponse(res, err);
			}
		}
	]
}

export default SongsApiController;