import { Link } from 'react-router-dom';
import classes from './Profile.module.css';

const defaultClassName = `text text_type_main-medium ${classes.sidebarLink}`;

const ProfileSidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarItem}>
        <Link to='/profile' className={`${defaultClassName} ${classes.sidebarLinkActive}`}>
          Профиль
        </Link>
      </div>
      <div className={classes.sidebarItem}>
        <Link className={`${defaultClassName} text_color_inactive`}>
          История заказов
        </Link>
      </div>
      <div className={classes.sidebarItem}>
        <Link className={`${defaultClassName} text_color_inactive`}>
          Выход
        </Link>
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