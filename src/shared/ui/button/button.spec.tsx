import { render } from '@testing-library/react';
import React from 'react';
import { Button } from './button';

describe('Button component', () => {
  it('should correctly render text inside the button', () => {
    const MOCK_TEXT = 'mock text';

    const { getByText } = render(<Button>{MOCK_TEXT}</Button>);

    const button = getByText(MOCK_TEXT);

    expect(button).toBeInTheDocument();
  });
});
