import React from 'react';
import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button component', () => {
  it('should correctly render text inside the button', () => {
    const text = 'test';

    render(<Button>{text}</Button>);

    const button = screen.getByText(text);

    expect(button).toHaveTextContent(text);
  });
});
