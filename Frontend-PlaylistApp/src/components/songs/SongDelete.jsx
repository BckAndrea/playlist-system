import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Song.css';

import UserService from '../../services/UserService.js'

const SongDelete = () => {
    const {playlistId, songId} = useParams();
    const [responseMessage, setResponseMessage] = useState();

    // The 'location' of the the link, gives us an possibility to get some data associated with the link we came from to this component
    const location = useLocation()
    // We get the state, ie the given song to edit and store that as the first currentSong
    const [currentSong] = useState(location.state)

    const navigate = useNavigate();
    
    // handleDelete is the one called by the forms handleSubmit
    const handleDelete = async () => {

        try {
            const response = await UserService.deleteSongForPlaylist(playlistId, songId);
            // Show message and wait 3 second before going back
            setResponseMessage(response.data.message)

            setTimeout(() => {
                navigate(`/playlists/${playlistId}/songs`);
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
                            <input type="text" className="form-control" defaultValue = {currentSong.name} readOnly />
                            
                        </div>
                        <button onClick={handleDelete} className="btn btn-secondary btn-block">
                                Delete
                        </button>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
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

export default SongDelete;