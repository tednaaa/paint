import React from 'react';
import { render, screen } from '@testing-library/react';

import { Container } from './container';

describe('Container component', () => {
  it('should render correctly', () => {
    const text = 'test';

    render(<Container>{text}</Container>);

    const container = screen.getByText(text);

    expect(container).toHaveTextContent(text);
  });
});
