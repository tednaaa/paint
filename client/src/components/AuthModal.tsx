import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useEffect, useState } from 'react';
import authModalState from '../store/authModalState';
import '../styles/authModal.scss';
import { Button } from './Button';

export const AuthModal: FC = observer(() => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      authModalState.setActive(false);
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
          onChange={(event) => setInputValue(event.currentTarget.value)}
          value={inputValue}
          className="modal__input"
          type="text"
        />
      </label>
      <Button type="submit" text="Sign in" className="modal__button" />
    </form>
  );
});
