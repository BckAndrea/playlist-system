import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserService from '../../services/UserService.js'
import AuthService from "../../services/AuthService.js";
import Table from "../Table.jsx"

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]); 
  const [error, setError] = useState('');

  const [currentUser] = useState(AuthService.getCurrentUser()); // Initialize to current settings from localstorage

  // We use this function for both useEffect and handleClick
  const getAllPlaylists = () => {
    UserService.getAllPlaylistsForUser()
      .then(res => {
        setPlaylists(res.data.data)  
      })
      .catch(err => {
        setError(err.message);
      });
  }
  // you tell React that your component needs to do something after render with useEffect
  useEffect(() => {
    getAllPlaylists()
  }, []);

  const fields = [{ name: 'name', label: 'Name' }, { name: 'genre', label: 'Genre' }, { name: 'createdAt', label: 'Creation time ' }];

  return (

    <div className="container text-primary-emphasis bg-dark-transparent border-0 p-5 rounded text-center  mt-5 mb-5 ">
      <h1 className="mt-5 fw-bolder text-dark "> {currentUser? currentUser.username :  " "}  </h1>
      {currentUser? <a className="btn btn-info bi-journal-plus" href="/playlists/create">Create new playlist</a> : " " }
      <div className="table-responsive my-5">
        <Table caption={'Playlists'} fields={fields} rows={playlists} resourceName='/playlists'></Table>
      </div>


      <button type="button" className="btn btn-primary" onClick={getAllPlaylists}>Refresh</button>
      {error && <p className="text-danger">{error}</p>}
    </div>

  );
};
export default Playlists;