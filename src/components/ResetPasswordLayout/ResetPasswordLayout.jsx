import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Input,
  PasswordInput,
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './ResetPasswordLayout.module.css';

const ResetPasswordLayout = () => {
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
    // dispatch(...);
  }

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </p>
      <PasswordInput
        placeholder='Введите новый пароль'
        value={state.password || ''}
        name={'password'}
        extraClass="mb-6"
        onChange={handleChange}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        value={state.code || ''}
        name={'code'}
        error={false}
        size={'default'}
        extraClass="mb-6"
        onChange={handleChange}
      />
      <div className={classes.buttonWrap}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
      <div className='mt-20'>
        <div className={`${classes.buttonGroup} mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className={`${classes.link} text text_type_main-default`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordLayout;