import { useState } from 'react';
import '../styles/settingbar.scss';

export const SettingBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.currentTarget.value));
  };

  return (
    <div className="setting-bar">
      <p className="setting-bar__text">Толщина линии</p>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        className="setting-bar__thickness"
      />
    </div>
  );
};
