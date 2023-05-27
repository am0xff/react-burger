import { useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  EmailInput, 
  PasswordInput, 
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm';
import { AuthStore } from '../../services/reducers/user';
import { register } from '../../services/actions/user';
import classes from './RegisterLayout.module.css';

const RegisterLayout = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { registerSuccess } = useSelector<{ auth: AuthStore }, AuthStore>((state) => state.auth);

  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userName, email, password } = e.currentTarget;
    
    dispatch(register({
      name: userName.value,
      email: email.value,
      password: password.value
    }));
  }

  useEffect(() => {
    if (registerSuccess) {
      return navigate('/login');
    }
  }, [navigate, registerSuccess]);

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Регистрация
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={values.userName || ''}
          name={'userName'}
          error={false}
          size={'default'}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <EmailInput
          value={values.email || ''}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <PasswordInput
          value={values.password || ''}
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