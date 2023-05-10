import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EmailInput,
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './ForgotPasswordLayout.module.css';
import { getCodeForReset } from '../../services/actions/user';

const ForgotPasswordLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({});
  const { success } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.getAttribute('name');

    setState((state) => ({
      ...state,
      [name]: target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email } = e.target;

    dispatch(getCodeForReset({
      email: email.value
    }));
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