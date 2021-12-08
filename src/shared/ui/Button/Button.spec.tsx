import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('should correctly render text inside the button', () => {
    const MOCK_TEXT = 'mock text';

    const { findByText } = render(<Button>{MOCK_TEXT}</Button>);

    const button = findByText(MOCK_TEXT);

    expect(button).toBeTruthy();
  });
});
