import { Link, useMatch } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './AppHeader.module.css';
import { createClassNameByObject } from '../../utils/styles';

const defaultClassName = `text text_type_main-default text_color_inactive pl-5 pt-4 pr-5 pb-4 ${classes.navLink}`;

const ICON_MAP = {
  'burger': BurgerIcon,
  'list': ListIcon,
  'profile': ProfileIcon
}

const AppHeaderLink = ({ url, icon, text }) => {
  const match = useMatch(url + '/*');

  const linkClasses = createClassNameByObject({
    [defaultClassName]: true,
    [classes.navLinkActive]: !!match
  });

  const Icon = ICON_MAP[icon];

  return (
    <Link to={url} className={linkClasses}>
      {Icon && <Icon type={!!match ? 'primary' : 'secondary'} />}
      <span className='ml-2'>{text}</span>
    </Link>
  )
}

export default AppHeaderLink;