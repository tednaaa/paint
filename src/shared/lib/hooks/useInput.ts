import { ChangeEvent, useState } from 'react';

export const useInput = (initialState: any) => {
  const [value, setValue] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return [value, handleInputChange, setValue];
};
