import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCodeForReset } from '../../services/actions/user';
import { AuthStore } from '../../services/reducers/user';
import classes from './ForgotPasswordLayout.module.css';

const ForgotPasswordLayout = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<{ email: string }>({ email: '' });
  const { success } = useSelector<{ auth: AuthStore }, AuthStore>((state) => state.auth);

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
    
    const { email } = e.currentTarget;

    dispatch(getCodeForReset({ email: email.value }));
  }

  useEffect(() => {
    if (success) {
      navigate('/reset-password', { state: { reset: true } })
    }
  }, [location, navigate, success])
  
  return (
    <main className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </p>
      <form onSubmit={handleSubmit}>
        <EmailInput
          value={state.email || ''}
          placeholder='Укажите e-mail'
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <div className={classes.buttonWrap}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className='mt-20'>
        <div className={`${classes.buttonGroup} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={`${classes.link} text text_type_main-default`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ForgotPasswordLayout;