import { Outlet } from 'react-router-dom';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <Profile>
      <Outlet />
    </Profile>
  )
}

export default ProfilePage;