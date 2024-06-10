import { useState } from 'react';

const useInput = (initialValue, maxLength) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return [value, handleChange, reset];
};

export default useInput;
