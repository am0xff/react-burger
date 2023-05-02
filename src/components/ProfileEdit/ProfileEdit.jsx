import { useSelector, useDispatch } from 'react-redux';
// PasswordInput
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './ProfileEdit.module.css';
import { useCallback, useEffect, useState } from 'react';
import { getUser, updateProfile } from '../../services/actions/user';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [state, setState] = useState({});

  const init = useCallback(() => {
    setState(user)
  }, [user]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.getAttribute('name');

    setState((state) => ({
      ...state,
      [name]: target.value
    }));
  }

  const handleSubmit = () => {
    dispatch(updateProfile(state));
  }

  const handleClear = () => {
    init();
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setState(user);
    }
  }, [user])

  return (
    <div className={classes.wrap}>
      <Input
        type={'text'}
        name={'name'}
        value={state.name || ''}
        placeholder={'Имя'}
        extraClass="mb-6"
        icon="EditIcon"
        onChange={handleChange}
      />
      <EmailInput
        name={'email'}
        value={state.email || ''}
        placeholder={'Логин'}
        isIcon={true}
        extraClass="mb-6"
        onChange={handleChange}
      />
      {/* <PasswordInput
        name={'password'}
        value={''}
        extraClass="mb-6"
        icon="EditIcon"
      /> */}
      <div className={classes.buttons}>
        <Button 
          htmlType="button" 
          type="secondary" 
          size="medium" 
          onClick={handleClear}
        >
          Отмена
        </Button>
        <Button 
          htmlType="button" 
          type="primary" 
          size="medium" 
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ProfileEdit;