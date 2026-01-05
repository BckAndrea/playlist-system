import Playlist from "../models/PlaylistModel.js";

class MongoosePlaylistManager {
    constructor() {
        // For playlist manager, so that we remember the class used 
        this.PlaylistModel = Playlist;
    }

    async initialize(app = null) {
        // No Initialization required in this class
        // return stats if somegenre whants to check
        return true;
    }

    async fetchPlaylists(user) {
        try {
            // No lean here so we can use toObject
            //pickout the user.id
            const allPlaylistsBelongingToUser = await this.PlaylistModel.find({ belongsTo: user.id });
            // Convert mongoose _id to id
            const allPlaylistObjects = allPlaylistsBelongingToUser.map(element => {
                return element.toObject()
            })
            console.log('All playlists loaded');
            return allPlaylistObjects
        } catch (e) {
            console.log('Empty playlists loaded');
            return []
        }
    }

    async addPlaylist(user, name, genre) {
        // Check that we have a selected user
        if (user) {
            // The uniqueness for the name is now per user!
            //pickout the user.id
            const haveDuplicatePlaylist = await this.PlaylistModel.findOne({ belongsTo: user.id, name, genre }).lean();
            if (!haveDuplicatePlaylist) {
                const newPlaylist = {
                    name: name,
                    genre: genre,
                    belongsTo: user.id
                };
                // Here we get a database document back, we like to return a POJO, plain javascript object back so we stay neutral to the db tech.
                const addedPlaylistDocument = await this.PlaylistModel.create(newPlaylist);

                if (addedPlaylistDocument) {
                    console.log('New playlist added!');
                    // Convert from Mongoose to plain object
                    const savedPlaylist = addedPlaylistDocument.toObject();
                    return savedPlaylist;
                } else
                    console.log('Error in db creating the new playlist!')
            } else
                console.log('Playlist name taken!')
        } else
            console.log('No user given!')

        // here when something wrong
        return null;

    }

    async removePlaylist(user, id) {
        // The uniqueness for the playlist is id! Then check if user same as belongsTo
        // The populate is mongoose way of filling in the data for the child property,
        // in this case the 'belongsTo' property, when executing the query
        const selectedPlaylistById = await this.PlaylistModel.findById(id).populate('belongsTo');

        if (selectedPlaylistById) {
            // Here we security check that this playlist really belongs to the user!
            // How would YOU do if the user is the admin user? 
            if (selectedPlaylistById.belongsTo.id == user.id) {
                const removedPlaylistDocument = await this.PlaylistModel.findByIdAndDelete(id);
                console.log('Playlist removed!' + removedPlaylistDocument);
                return removedPlaylistDocument.toObject();
            } else {
                console.log(`Playlist id and user do not correlate! No deletion made!`)
                return null;
            }
        } else {
            console.log(`No playlist found with id = ${id} !`)
            return null;
        }
    }

    async changePlaylist(user, playlist) {

        // Here we need to get the full document to be able to do save
        // Here we use mongoose to only select the combination of id and user, ie secured access
        // No lean() here so that we can use save
        //pick user.id
        const playlistToChangeDocument = await this.PlaylistModel.findOne({ _id: playlist.id, belongsTo: user.id });

        if (playlistToChangeDocument) {

            // The name should be unique for user so check so that we do not already have
            // for this user a document with this name!
            const oldName = playlistToChangeDocument.name;
            // check so that we dont have an other playlist name with the same new name
            let sameNamePlaylist = null;
            if (oldName != playlist.name)
                //pick user.id
                sameNamePlaylist = await this.PlaylistModel.findOne({ name: playlist.name, belongsTo: user.id });

            if (!sameNamePlaylist) {
                // It is ok to change name for user
                playlistToChangeDocument.name = playlist.name;
                playlistToChangeDocument.genre = playlist.genre;
                
                console.log('Playlist changed!');

                const changedPlaylistDocument = await playlistToChangeDocument.save();
                //Give back the changed as plain object
                return changedPlaylistDocument.toObject();
            } else
                console.log('Playlist with same name exists for this user!')

        } else
            console.log('Playlist to change not found!')

        // all paths except success comes here
        return null;
    }


    async getPlaylistById(user, id) {
        // On a query we can use lean to get a plain javascript object
        // Use mongoose criteria for id and belongsTo user
        //pick user.id
        const foundPlaylist = await this.PlaylistModel.findOne({ _id: id, belongsTo: user.id });

        if (foundPlaylist) {
            console.log('Got playlist: ' + foundPlaylist.name + ':' + foundPlaylist.genre);
            // Convert to POJO
            return foundPlaylist.toObject();
        } else {
            console.log(`Playlist not found with id =${id} !`)
        }

        return null;
    }

}

export default MongoosePlaylistManager;