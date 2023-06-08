import { useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Input,
  PasswordInput,
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm';
import { createNewPassword } from '../../services/actions/user';
import classes from './ResetPasswordLayout.module.css';

const ResetPasswordLayout = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ password: '', token: '' });
  
  const isReset = location?.state?.reset || false;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { password, token } = e.currentTarget;

    dispatch(createNewPassword({
      password: password.value,
      token: token.value
    }));
  }

  useEffect(() => {
    if (!isReset) {
      navigate('/');
    }
  }, [isReset, navigate])

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          placeholder='Введите новый пароль'
          value={values.password || ''}
          name={'password'}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={values.token || ''}
          name={'token'}
          error={false}
          size={'default'}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <div className={classes.buttonWrap}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className='mt-20'>
        <div className={`${classes.buttonGroup} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className={`${classes.link} text text_type_main-default`} to={''}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordLayout;