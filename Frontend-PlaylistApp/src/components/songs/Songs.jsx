import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import UserService from '../../services/UserService.js'

import Table from "../Table.jsx"

const Songs = () => {
    const { playlistId } = useParams();
    const location = useLocation();
    const playlist = location.state;

    const [songs, setSongs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        UserService.getAllSongsForPlaylist(playlistId)
            .then((res) => {
                setSongs(res.data.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [playlistId]);

    const fields = [{ name: "name", label: "Name" },{ name: "artist", label: "Artist" },{ name: "releaseYear", label: "Release Year" }];

    return (
        <div className="container text-primary-emphasis bg-dark-transparent border-0 p-5 rounded text-center  mt-5 mb-5 ">
        <div className="container mt-5">
            <h1 className="text-dark mb-4">Playlist: {playlist?.name || " "}</h1>
            <a className="btn btn-info bi-journal-plus mb-2" href={`/playlists/${playlistId}/songs/create`}>Add new song</a>
            <div className="table-responsive my-5">
                    <Table caption={'Songs'} fields={fields} rows={songs} resourceName='/songs' playlistId={playlistId}></Table>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        </div>
    );
};

export default Songs;