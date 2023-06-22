
import { ReactNode } from 'react';
import ProfileSidebar from './ProfileSidebar';
import classes from './Profile.module.css';

type Props = {
  children: ReactNode
}

const Profile = ({ children }: Props) => {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.mainLayout}>
          <ProfileSidebar />

          <div className={classes.mainContent}>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile;