import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Signin from './components/Signing.jsx';
import Signup from './components/Signup.jsx';
import Playlists from './components/playlist/Playlists.jsx';
import PlaylistUpdate from './components/playlist/PlaylistUpdate.jsx';
import PlaylistCreate from './components/playlist/PlaylistCreate.jsx';
import PlaylistDelete from './components/playlist/PlaylistDelete.jsx';
import Songs from './components/songs/Songs.jsx';
import SongUpdate from './components/songs/SongUpdate.jsx';
import SongCreate from './components/songs/SongCreate.jsx';
import SongDelete from './components/songs/SongDelete.jsx';
import Logout from './components/Logout.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
      path: "/playlists",
      element: <Playlists />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/playlists/create",
      element: <PlaylistCreate />,
    },
    {
      path: "/playlists/:playlistId/update",
      element: <PlaylistUpdate />,
    },
    {
      path: "/playlists/:playlistId/delete",
      element: <PlaylistDelete />,
    },
    {
      path: "/playlists/:playlistId/songs",
      element: <Songs/>, 
    },
    {
      path: "/playlists/:playlistId/songs/create",
      element: <SongCreate />,
    },
    {
      path: "/playlists/:playlistId/songs/:songId/update",
      element: <SongUpdate />,
    },
    {
      path: "/playlists/:playlistId/songs/:songId/delete",
      element: <SongDelete />,
    },
   
  ]);

  export default router;