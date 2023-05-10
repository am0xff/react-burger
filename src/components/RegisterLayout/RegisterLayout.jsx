import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EmailInput, 
  PasswordInput, 
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';
import classes from './RegisterLayout.module.css';

const RegisterLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    const { name, email, password } = e.target;
    
    dispatch(register({
      name: name.value,
      email: email.value,
      password: password.value
    }));
  }

  useEffect(() => {
    if(success) {
      navigate('/login');
    }
  }, [navigate, success])

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Регистрация
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={state.name || ''}
          name={'name'}
          error={false}
          size={'default'}
          extraClass="mb-6"
          onChange={handleChange}
        />
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className='mt-20'>
        <div className={`${classes.buttonGroup} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login" className={`${classes.link} text text_type_main-default`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterLayout;