import { ChangeEvent, FC, useState } from 'react';
import toolState from '../store/toolState';
import '../styles/settingbar.scss';

export const SettingBar: FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lineWidth = parseInt(event.currentTarget.value);

    const minThickness = 1;
    const maxThickness = 50;

    if (lineWidth >= minThickness && lineWidth <= maxThickness) {
      setInputValue(lineWidth);

      toolState.setLineWidth(lineWidth);
    }
  };

  return (
    <div className="setting-bar">
      <p className="setting-bar__text">Толщина линии</p>
      <input
        type="number"
        onChange={handleInputChange}
        value={inputValue}
        className="setting-bar__thickness"
      />
    </div>
  );
};
