import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (token && onlyUnAuth) {
    return <Navigate to="/" replace />
  }

  return element;
}

export default ProtectedRouteElement;