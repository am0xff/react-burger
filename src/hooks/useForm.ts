import { useState, ChangeEvent, useCallback } from "react";

const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const name = target.getAttribute('name');
    const value = target.value

    if (!name) return;

    setValues((state) => ({
      ...state,
      [name]: value
    }));
  }, []);

  return { values, handleChange, setValues }
}

export default useForm;