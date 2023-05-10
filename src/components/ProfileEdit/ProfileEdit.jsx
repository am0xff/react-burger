import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './ProfileEdit.module.css';
import { getUser, updateProfile } from '../../services/actions/user';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user: initialValue, success } = useSelector((state) => state.auth);
  const [state, setState] = useState(null);

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

    dispatch(updateProfile({
      name: name.value,
      email: email.value,
      password: password.value
    }));
  }

  const handleClear = () => {
    setState(initialValue);
  }

  useEffect(() => {    
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setState(initialValue);
    }
  }, [success, initialValue]);

  const isDirty = useMemo(() => {
    return JSON.stringify(initialValue) !== JSON.stringify(state);
  }, [initialValue, state]);

  return (
    <div className={classes.wrap}>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          name={'name'}
          value={state?.name || ''}
          placeholder={'Имя'}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={handleChange}
        />
        <EmailInput
          name={'email'}
          value={state?.email || ''}
          placeholder={'Логин'}
          isIcon={true}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={state?.password || ''}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={handleChange}
        />
        <div className={classes.buttons}>
          <Button 
            htmlType="button"
            type="secondary" 
            size="medium" 
            onClick={handleClear}
            disabled={!isDirty}
          >
            Отмена
          </Button>
          <Button 
            htmlType="submit" 
            type="primary" 
            size="medium"
            disabled={!isDirty}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit;