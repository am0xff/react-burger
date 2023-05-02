import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element }) => {
  const token = localStorage.getItem('token');

  localStorage.setItem('url', window.location.href);

  return token ? element : <Navigate to="/login" replace />
}

export default ProtectedRouteElement;