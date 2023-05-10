import classes from './Profile.module.css';
import ProfileSidebarItem from './ProfileSidebarItem';

const defaultClassName = `text text_type_main-medium ${classes.sidebarLink}`;


const ProfileSidebar = () => {
  return (
    <div className={classes.sidebar}>
      <ProfileSidebarItem text={'Профиль'} url={'/profile'} />
      <ProfileSidebarItem text={'История заказов'} url={'/profile/orders'} />
      <div className={classes.sidebarItem}>
        <p className={`${defaultClassName} text_color_inactive`}>
          Выход
        </p>
      </div>
      <div className='mt-20'>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  )
}

export default ProfileSidebar;