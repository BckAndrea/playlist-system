import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Song.css';

import UserService from '../../services/UserService.js';

import schema from './songValidationSchema.js'

const SongCreate = () => {
    const {playlistId} = useParams();
    const [responseMessage, setResponseMessage] = useState();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    // doCreate is the one called by the forms handleSubmit
    const doCreate = async (formData) => {

        try {
            const response = await UserService.addSongForPlaylist(playlistId,formData);
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
                    <h1> New song</h1>
                    <form onSubmit={handleSubmit(doCreate)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" {...register("name")} />
                            {errors?.name && <label className="error-feedback">{errors.name.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="artist">Artist</label>
                            <input type="text" className="form-control" {...register("artist")} />
                            {errors?.artist && <label className="error-feedback">{errors.artist.message}</label>}
                        </div><div className="form-group">
                            <label htmlFor="releaseYear">Release year</label>
                            <input type="number" className="form-control" {...register("releaseYear")} />
                            {errors?.releaseYear && <label className="error-feedback">{errors.releaseYear.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block" >
                                Create
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block">
                                Cancel
                            </button>
                        </div>
                    </form>
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

export default SongCreate;