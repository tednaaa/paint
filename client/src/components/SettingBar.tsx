import { ChangeEvent, FC, useEffect, useState } from 'react';
import toolState from '../store/toolState';
import '../styles/settingBar.scss';

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
      <label className="setting-bar__label">
        Line width
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="setting-bar__input"
        />
      </label>
    </div>
  );
};
