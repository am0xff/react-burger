import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  EmailInput,
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './ForgotPasswordLayout.module.css';
import { getCodeForReset } from '../../services/actions/user';

const ForgotPasswordLayout = () => {
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
    dispatch(getCodeForReset());
  }
  
  return (
    <main className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </p>
      <EmailInput
        value={state.email || ''}
        placeholder='Укажите e-mail'
        name={'email'}
        isIcon={false}
        extraClass="mb-6"
        onChange={handleChange}
      />
      <div className={classes.buttonWrap}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>
          Восстановить
        </Button>
      </div>
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