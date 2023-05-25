import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <>
      <AppHeader />
      <Profile>
        <Outlet />
      </Profile>
    </>
  )
}

export default ProfilePage;