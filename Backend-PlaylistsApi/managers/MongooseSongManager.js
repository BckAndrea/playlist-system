import Song from "../models/SongModel.js";

class MongooseSongManager {
    constructor() {
        // For song manager, so that we remember the class used 
        this.SongModel = Song;
    }

    async initialize(app = null) {
        // No Initialization required in this class
        // return stats if somegenre whants to check
        return true;
    }

    async fetchSongs(playlistId) {
        try {
            // No lean here so we can use toObject
            //pickout the playlist.id
            const allSongsBelongingToPlaylist = await this.SongModel.find({ belongsTo: playlistId });
            // Convert mongoose _id to id
            const allSongObjects = allSongsBelongingToPlaylist.map(element => {
                return element.toObject()
            })
            console.log('All songs loaded');
            return allSongObjects
        } catch (e) {
            console.log('Empty songs loaded');
            return []
        }
    }

    async addSong(playlist, name, artist, releaseYear) {
        // Check that we have a selected playlist
        if (playlist) {
            // The uniqueness for the name is now per playlist!
            //pickout the playlist.id
            const haveDuplicateSong = await this.SongModel.findOne({ belongsTo: playlist.id, name, artist, releaseYear }).lean();
            if (!haveDuplicateSong) {
                const newSong = {
                    name: name,
                    artist: artist,
                    releaseYear: releaseYear,
                    belongsTo: playlist.id
                };
                // Here we get a database document back, we like to return a POJO, plain javascript object back so we stay neutral to the db tech.
                const addedSongDocument = await this.SongModel.create(newSong);

                if (addedSongDocument) {
                    console.log('New song added!');
                    // Convert from Mongoose to plain object
                    const savedSong = addedSongDocument.toObject();
                    return savedSong;
                } else
                    console.log('Error in db creating the new song!')
            } else
                console.log('Song name taken!')
        } else
            console.log('No playlist given!')

        // here when something wrong
        return null;

    }

    async removeSong(playlist, id) {
        // The uniqueness for the song is id! Then check if playlist same as belongsTo
        // The populate is mongoose way of filling in the data for the child property,
        // in this case the 'belongsTo' property, when executing the query
        const selectedSongById = await this.SongModel.findById(id).populate('belongsTo');

        if (selectedSongById) {
            // Here we security check that this song really belongs to the playlist!
            // How would YOU do if the playlist is the admin playlist? 
            if (selectedSongById.belongsTo.id == playlist.id) {
                const removedSongDocument = await this.SongModel.findByIdAndDelete(id);
                console.log('Song removed!' + removedSongDocument);
                return removedSongDocument.toObject();
            } else {
                console.log(`Song id and playlist do not correlate! No deletion made!`)
                return null;
            }
        } else {
            console.log(`No song found with id = ${id} !`)
            return null;
        }
    }

    async changeSong(playlist, song) {

        // Here we need to get the full document to be able to do save
        // Here we use mongoose to only select the combination of id and playlist, ie secured access
        // No lean() here so that we can use save
        //pick playlist.id
        const songToChangeDocument = await this.SongModel.findOne({ _id: song.id, belongsTo: playlist.id });

        if (songToChangeDocument) {

            // The name should be unique for playlist so check so that we do not already have
            // for this playlist a document with this name!
            const oldName = songToChangeDocument.name;
            // check so that we dont have an other song name with the same new name
            let sameNameSong = null;
            if (oldName != song.name)
                //pick playlist.id
                sameNameSong = await this.SongModel.findOne({ name: song.name, belongsTo: playlist.id });

            if (!sameNameSong) {
                // It is ok to change name for playlist
                songToChangeDocument.name = song.name;
                songToChangeDocument.artist = song.artist;
                songToChangeDocument.releaseYear = song.releaseYear
                
                console.log('Song changed!');

                const changedSongDocument = await songToChangeDocument.save();
                //Give back the changed as plain object
                return changedSongDocument.toObject();
            } else
                console.log('Song with same name exists for this playlist!')

        } else
            console.log('Song to change not found!')

        // all paths except success comes here
        return null;
    }


    async getSongById(playlist, id) {
        // On a query we can use lean to get a plain javascript object
        // Use mongoose criteria for id and belongsTo playlist
        //pick playlist.id
        const foundSong = await this.SongModel.findOne({ _id: id, belongsTo: playlist.id });

        if (foundSong) {
            console.log('Got song: ' + foundSong.name + ':' + foundSong.artist + ':' + foundSong.releaseYear);
            // Convert to POJO
            return foundSong.toObject();
        } else {
            console.log(`Song not found with id =${id} !`)
        }

        return null;
    }

}

export default MongooseSongManager;