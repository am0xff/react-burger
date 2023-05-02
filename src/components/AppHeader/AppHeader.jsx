import { Link } from 'react-router-dom';
import { 
    Logo,
    BurgerIcon, 
    ListIcon, 
    ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';

import classes from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.headerInner}>
          <nav className={`${classes.nav} pb-4 pt-4`}>
            <Link to='/' className={`${classes.navLink} text text_type_main-default text_color_inactive pl-5 pt-4 pr-5 pb-4`}>
              <BurgerIcon type="secondary" /><span className='ml-2'>Конструктор</span>
            </Link>
            <a href='/' className={`${classes.navLink} text text_type_main-default text_color_inactive pl-5 pt-4 pr-5 pb-4`}>
              <ListIcon type="secondary" /><span className='ml-2'>Лента заказов</span>
            </a>
          </nav>
          <Logo className={classes.logo} />
          <div className={`${classes.profile} pb-4 pt-4`}>
            <Link to="/profile" className={`${classes.navLink} text text_type_main-default text_color_inactive pl-5 pt-4 pr-5 pb-4`}>
              <ProfileIcon type="secondary" /><span className='ml-2'>Личный кабинет</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;