import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderLink from './AppHeaderLink';
import classes from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.headerInner}>
          <nav className={`${classes.nav} pb-4 pt-4`}>
            <AppHeaderLink url={'/'} icon={'burger'} text={'Конструктор'} />
            <AppHeaderLink url={'/404'} icon={'list'} text={'Лента заказов'} />
          </nav>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={`${classes.profile} pb-4 pt-4`}>
            <AppHeaderLink url={'/profile'} icon={'profile'} text={'Личный кабинет'} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;