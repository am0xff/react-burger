
import ProfileSidebar from './ProfileSidebar';
import classes from './Profile.module.css';

const Profile = ({ children }) => {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.mainLayout}>
          <ProfileSidebar />

          <div className='ml-15'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile;