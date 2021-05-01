import { ChangeEvent, FC, useEffect, useState } from 'react';
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
    }
  };

  useEffect(() => {
    toolState.setLineWidth(inputValue);
  }, [inputValue]);

  return (
    <div className="setting-bar">
      <p className="setting-bar__text">Толщина линии</p>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="setting-bar__thickness"
      />
    </div>
  );
};
