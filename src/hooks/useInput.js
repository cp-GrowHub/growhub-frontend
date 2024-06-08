import React from 'react';

function useInput(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, onChangeHandler, reset];
}

export default useInput;
