import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { socket } from '../api';
import { ParsedMessage, UrlParams } from '../interfaces';
import { Brush, Circle, Eraser, Line, Rect } from '../tools';
import { authModalState, canvasState, sessionState, toolState } from '../store';
import { Button } from '.';
import '../styles/authModal.scss';

export const AuthModal: FC = observer(() => {
  const [isShowModalOfConnectedUser, setShowModalOfConnectedUser] =
    useState(false);
  const [connectedUsername, setConnectedUsername] = useState('');
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
        const parsedMessage: ParsedMessage = JSON.parse(event.data);

        switch (parsedMessage.method) {
          case 'connect':
            setConnectedUsername(parsedMessage.username);
            break;
          case 'draw':
            handleDraw(parsedMessage);
            break;
        }
      };
    }
  };

  const handleDraw = (message: ParsedMessage) => {
    const figure = message.figure;
    const ctx = canvasState.canvas.getContext('2d');

    if (ctx) {
      switch (figure.type) {
        case 'brush':
          Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
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
        case 'circle':
          Circle.staticDraw(
            ctx,
            figure.x,
            figure.y,
            figure.radius,
            figure.color
          );
          break;
        case 'eraser':
          Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
          break;
        case 'line':
          Line.staticDraw(
            ctx,
            figure.x,
            figure.y,
            figure.currentX,
            figure.currentY,
            figure.color,
            figure.lineWidth
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
    const maxUsernameLength = 20;

    if (username.length <= maxUsernameLength) {
      setInputValue(username);
    }
  };

  useEffect(() => {
    authModalState.setActive(true);
  }, []);

  useEffect(() => {
    setShowModalOfConnectedUser(true);

    setTimeout(() => {
      setShowModalOfConnectedUser(false);
    }, 3000);
  }, [connectedUsername]);

  return (
    <>
      <p
        className={`user-connect-modal ${
          isShowModalOfConnectedUser ? 'user-connect-modal--active' : ''
        }`}
      >
        {connectedUsername} подключился
      </p>
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
    </>
  );
});
