import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="col-md-12">
        <div className="card card-container rounded">
            <h3>Are you sure you want to leave?</h3>
            <button onClick={handleLogout} className="btn btn-danger">
            Logout
            </button>
        </div>
    </div>
  );
}

export default Logout;