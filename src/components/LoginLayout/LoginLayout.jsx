import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  EmailInput, 
  PasswordInput, 
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import classes from './LoginLayout.module.css';

const LoginLayout = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const name = target.getAttribute('name');

    setState((state) => ({
      ...state,
      [name]: target.value
    }));
  }

  const handleSubmit = () => {
    dispatch(login(state));
  }

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Вход
      </p>
      <EmailInput
        value={state.email || ''}
        name={'email'}
        isIcon={false}
        extraClass="mb-6"
        onChange={handleChange}
      />
      <PasswordInput
        value={state.password || ''}
        name={'password'}
        extraClass="mb-6"
        onChange={handleChange}
      />
      <div className={classes.buttonWrap}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>
          Войти
        </Button>
      </div>
      <div className='mt-20'>
        <div className={`${classes.buttonGroup} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register" className={`${classes.link} text text_type_main-default`}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={classes.buttonGroup}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className={`${classes.link} text text_type_main-default`}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout;