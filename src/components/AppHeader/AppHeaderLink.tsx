import { Link, useMatch } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './AppHeader.module.css';
import { createClassNameByObject } from '../../utils/styles';

const defaultClassName = `text text_type_main-default text_color_inactive pl-5 pt-4 pr-5 pb-4 ${classes.navLink}`;

type Props = {
  url: string;
  icon: string;
  text: string
}

const AppHeaderLink = ({ url, icon, text }: Props) => {
  const match = useMatch(url + '/*');

  const linkClasses = createClassNameByObject({
    [defaultClassName]: true,
    [classes.navLinkActive]: !!match
  });

  const iconType = !!match ? 'primary' : 'secondary';

  return (
    <Link to={url} className={linkClasses}>
      {icon === 'burger' && <BurgerIcon type={iconType} />}
      {icon === 'list' && <ListIcon type={iconType} />}
      {icon === 'profile' && <ProfileIcon type={iconType} />}
      <span className='ml-2'>{text}</span>
    </Link>
  )
}

export default AppHeaderLink;