import { Navigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';
import LoginLayout from '../components/LoginLayout/LoginLayout';

const LoginPage = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <AppHeader />
      <LoginLayout />
    </>
  )
}

export default LoginPage;