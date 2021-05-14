import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { handleConnectUser, handleDrawUser } from '../api';
import { UrlParams } from '../interfaces';
import { Brush } from '../tools';
import { authModalState, canvasState, sessionState, toolState } from '../store';
import { Button } from '.';
import '../styles/authModal.scss';

export const AuthModal: FC = observer(() => {
  const [inputValue, setInputValue] = useState('');
  const params = useParams<UrlParams>();

  const handleFormSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      canvasState.setUsername(inputValue);
      authModalState.setActive(false);
      sessionState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasState.canvas));

      handleConnectUser(canvasState.username);
      handleDrawUser();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.currentTarget.value;
    const maxUsernameLength = 20;

    if (username.length <= maxUsernameLength) {
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
