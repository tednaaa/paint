import React, { FC, MouseEventHandler } from 'react';

import styles from './download-button.module.scss';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const DownloadButton: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} title="download">
      <img className={styles.buttonImage} src={require('@/shared/images/icons/download.svg')} alt="" />
    </button>
  );
};
