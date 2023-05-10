import { Link, useMatch } from 'react-router-dom';
import classes from './Profile.module.css';
import { createClassNameByObject } from '../../utils/styles';

const defaultClassName = `text text_type_main-medium text_color_inactive ${classes.sidebarLink}`;

const ProfileSidebarItem = ({ text, url }) => {
  const match = useMatch(url);

  const linkClasses = createClassNameByObject({
    [defaultClassName]: true,
    [classes.sidebarLinkActive]: !!match
  });

  return (
    <div className={classes.sidebarItem}>
      <Link to={url} className={linkClasses}>
        {text}
      </Link>
    </div>
  )
}

export default ProfileSidebarItem;