import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import authModalState from '../store/authModalState';
import canvasState from '../store/canvasState';
import '../styles/authModal.scss';
import { Button } from './Button';

export const AuthModal: FC = observer(() => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      canvasState.setUsername(inputValue);

      authModalState.setActive(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.currentTarget.value;

    if (username.length <= 20) {
      setInputValue(username);
    }
  };

  useEffect(() => {
    authModalState.setActive(true);
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`modal ${authModalState.isActive ? 'modal--active' : ''}`}
    >
      <label className="modal__label">
        Write your name
        <input
          onChange={handleInputChange}
          value={inputValue}
          className="modal__input"
          type="text"
        />
      </label>
      <Button type="submit" text="Sign in" className="modal__button" />
    </form>
  );
});
