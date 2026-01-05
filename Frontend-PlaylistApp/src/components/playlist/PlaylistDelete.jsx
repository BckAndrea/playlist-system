import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get params from the router
import { useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Playlist.css';

import UserService from '../../services/UserService.js'



const PlaylistDelete = () => {
    const {playlistId} = useParams();
    const [responseMessage, setResponseMessage] = useState();

    const location = useLocation();
    // We get the state, ie the given playlist to edit and store that as the first currentPlaylist
    const [currentPlaylist] = useState(location.state)
    
    // Hook for navigation
    const navigate = useNavigate();

    // Delete is the one called by the forms handleSubmit
    const handleDelete = async () => {

        try {
            const response = await UserService.deletePlaylistForUser(playlistId);
            // Show message and wait 3 second before going back
            setResponseMessage(response.data.message)

            setTimeout(() => {
                navigate("/playlists");
            }, 3000)


        } catch (error) {
            // Show  message and wait 3 second before going back
            // In error response we have the response from the server, in error.message we get what axios thinks happened, lastly we try to just stringify the error
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            setResponseMessage(errortext)

            setTimeout(() => {
                // Go back
                navigate(-1);
            }, 3000)
        }
    }

    // We use the name handleCancel, IF the handler requires a chain we would add that as a callback 
    // with a doXyz name, ie the real doer so to speak! 
    // But do seldom see that need in own code, mostly when using validating or some other middleware code in between.
    const handleCancel = (e) => {
        e.preventDefault();
        // Go back
        navigate(-1);
    }

    return (
        <>
            <div className="col-md-12">
                <div className="card card-container rounded">
                    <h1> Delete playlist</h1>
                    
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" defaultValue = {currentPlaylist.name} readOnly />
                        </div>
                        
                        <div className="form-group d-flex justify-content-between">
                            <button onClick={handleDelete} className="btn btn-danger btn-block mt-2">
                                Delete
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block">
                                Cancel
                            </button>
                        </div>
                    
                    <p></p>
                    {responseMessage && (
                        <div className="alert alert-success" >
                            {responseMessage}
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default PlaylistDelete;