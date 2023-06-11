import { useEffect, useMemo, FormEvent } from 'react';
import { Input, Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateProfile } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/hooks';
import useForm from '../../hooks/useForm';
import classes from './ProfileEdit.module.css';

const ProfileEdit = () => {
  const dispatch: any = useDispatch();
  const { user: initialValue, success } = useSelector((state) => state.auth);
  const { values, handleChange, setValues } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { userName, email, password } = e.currentTarget;

    dispatch(updateProfile({
      name: userName.value,
      email: email.value,
      password: password.value
    }));
  }

  const handleClear = () => {
    if (initialValue) {
      // TODO: password = empty Check it!
      const { name, email, password = '' } = initialValue;
      
      setValues({
        userName: name,
        email, 
        password
      });
    }
  }

  useEffect(() => {    
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (success && initialValue) {
      // TODO: password = empty Check it!
      const { name, email, password = '' } = initialValue;

      setValues({
        userName: name,
        email, 
        password
      });
    }
  }, [success, initialValue, setValues]);

  const isDirty = useMemo(() => {
    return JSON.stringify(initialValue) !== JSON.stringify(values);
  }, [initialValue, values]);

  return (
    <div className={classes.wrap}>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          name={'userName'}
          value={values?.userName || ''}
          placeholder={'Имя'}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={handleChange}
        />
        <EmailInput
          name={'email'}
          value={values?.email || ''}
          placeholder={'Логин'}
          isIcon={true}
          extraClass="mb-6"
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={values?.password || ''}
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