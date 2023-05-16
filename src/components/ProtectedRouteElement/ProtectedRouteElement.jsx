import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const hasToken = !!localStorage.getItem('token');
  const location = useLocation();

  if (!hasToken && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (hasToken && onlyUnAuth) {
    return <Navigate to="/" replace />
  }

  return element;
}

export default ProtectedRouteElement;