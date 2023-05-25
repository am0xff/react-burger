import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EmailInput, 
  PasswordInput, 
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthStore } from '../../services/reducers/user';
import { login } from '../../services/actions/user';
import classes from './LoginLayout.module.css';

const LoginLayout = () => {
  const dispatch: any = useDispatch();
  const [state, setState] = useState<{ email: string, password: string }>({
    email: '', 
    password: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = useSelector<{ auth: AuthStore }, AuthStore>((state) => state.auth);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.getAttribute('name');

    setState((state) => ({
      ...state,
      ...(name ? { [name]: target.value } : {})
    }));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;

    dispatch(login({
      email: email.value,
      password: password.value
    }));
  }

  useEffect(() => {
    if (success) {
      navigate(from, { replace: true })
    }
  }, [from, navigate, success]);

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Вход
      </p>
      <form onSubmit={handleSubmit}>
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
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
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