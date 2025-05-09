import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthHeader.css';

const AuthHeader = () => {
  const { currentUser, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <header className="auth-header">
      <div className="auth-header-content">
        {currentUser ? (
          <>
            <span className="user-email">{currentUser.email}</span>
            <button onClick={logout} className="logout-button">Выйти</button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Вход</Link>
            <Link to="/register" className="auth-link">Регистрация</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
