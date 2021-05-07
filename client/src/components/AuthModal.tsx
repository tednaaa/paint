import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { socket } from '../api';
import { UrlParams } from '../interfaces';
import { Brush, Rect } from '../tools';
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

      sessionState.setSessionID(params.id);
      toolState.setTool(new Brush(canvasState.canvas, socket, params.id));

      socket.send(
        JSON.stringify({
          method: 'connect',
          id: params.id,
          username: canvasState.username,
        })
      );

      socket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        switch (message.method) {
          case 'connect':
            console.log(`Пользователь ${message.username} подключился`);
            break;
          case 'draw':
            handleDraw(message);
            break;
        }
      };
    }
  };

  const handleDraw = (message: any) => {
    const figure = message.figure;
    const ctx = canvasState.canvas.getContext('2d');

    if (ctx) {
      switch (figure.type) {
        case 'brush':
          Brush.draw(ctx, figure.x, figure.y);
          break;
        case 'rect':
          Rect.staticDraw(
            ctx,
            figure.x,
            figure.y,
            figure.width,
            figure.height,
            figure.color
          );

          break;
        case 'finish':
          ctx.beginPath();
          break;
      }
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
