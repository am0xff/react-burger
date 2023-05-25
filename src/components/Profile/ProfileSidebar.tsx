import { useDispatch, useSelector } from 'react-redux';
import ProfileSidebarItem from './ProfileSidebarItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { AuthStore } from '../../services/reducers/user';
import classes from './Profile.module.css';
import { useEffect } from 'react';

const defaultClassName = `text text_type_main-medium ${classes.sidebarLink}`;

const ProfileSidebar = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { logoutSuccess } = useSelector<{ auth: AuthStore }, AuthStore>((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      return navigate('/login');
    }
  }, [logoutSuccess, navigate]);

  return (
    <div className={classes.sidebar}>
      <ProfileSidebarItem text={'Профиль'} url={'/profile'} />
      <ProfileSidebarItem text={'История заказов'} url={'/profile/orders'} />
      <div className={classes.sidebarItem}>
        <NavLink className={`${defaultClassName} text_color_inactive`} onClick={handleLogout} to={''}>
          Выход
        </NavLink>
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