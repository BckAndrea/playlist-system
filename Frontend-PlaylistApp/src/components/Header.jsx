export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Playlists</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/playlists">Playlists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sadSD">Test for error</a>
            </li>

          </ul>
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link bi-person-plus-fill" href="/register">Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link bi-box-arrow-in-right" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </div>
        </div>
      </div>
    </nav>
  )
}


