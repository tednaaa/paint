import { ChangeEvent, FC, useState } from 'react';
import { toolState } from '../store';
import { validateInputLineWidth } from '../utils';
import '../styles/setting-bar.scss';

interface Props {
  settingBarRef: React.LegacyRef<HTMLDivElement>;
}

export const SettingBar: FC<Props> = ({ settingBarRef }) => {
  const [inputValue, setInputValue] = useState(1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lineWidth = parseInt(event.currentTarget.value);

    validateInputLineWidth(lineWidth, 1, 50, () => {
      setInputValue(lineWidth);

      toolState.setLineWidth(inputValue);
    });
  };

  return (
    <div className="setting-bar" ref={settingBarRef}>
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
