import '../styles/burger.scss';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isBurgerActive: boolean;
}

export const Burger: React.FC<Props> = ({ onClick, isBurgerActive }) => {
  return (
    <button
      onClick={onClick}
      className={`burger ${isBurgerActive ? 'burger--active' : ''}`}
    >
      <span></span>
    </button>
  );
};
