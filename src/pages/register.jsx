import { Navigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';
import RegisterLayout from '../components/RegisterLayout/RegisterLayout';

const RegisterPage = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <AppHeader />
      <RegisterLayout />
    </>
  )
}

export default RegisterPage;