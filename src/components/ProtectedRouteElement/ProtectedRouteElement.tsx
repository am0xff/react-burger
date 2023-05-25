// import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  element: JSX.Element,
  onlyUnAuth?: boolean
}

const ProtectedRouteElement = ({ element, onlyUnAuth = false }: Props) => {
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