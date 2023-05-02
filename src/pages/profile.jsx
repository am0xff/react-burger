import AppHeader from '../components/AppHeader/AppHeader';
import Profile from '../components/Profile/Profile';
import ProfileEdit from '../components/ProfileEdit/ProfileEdit';

const ProfilePage = () => {
  return (
    <>
      <AppHeader />
      <Profile>
        <ProfileEdit />
      </Profile>
    </>
  )
}

export default ProfilePage;