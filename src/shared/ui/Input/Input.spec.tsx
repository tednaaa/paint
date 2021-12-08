import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  const setup = () => {
    const MOCK_ARIA_LABEL = 'input';
    const utils = render(<Input aria-label={MOCK_ARIA_LABEL} />);
    const input = utils.getByLabelText(MOCK_ARIA_LABEL) as HTMLInputElement;

    return {
      input,
      ...utils,
    };
  };

  it('should correctly render input element', () => {
    const { input } = setup();

    expect(input).toBeTruthy();
  });
});
