import { useStore } from 'effector-react';
import React, { ChangeEvent, FC } from 'react';
import { $color, setColor } from '../model';

interface Props {
  className: string;
}

export const ColorPicker: FC<Props> = ({ className }) => {
  const color = useStore($color);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.currentTarget.value);
  };

  return (
    <input
      title="Pick color"
      value={color}
      onChange={handleColorChange}
      type="color"
      className={className}
    />
  );
};
