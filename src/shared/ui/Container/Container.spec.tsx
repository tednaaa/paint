import React from 'react';
import { render } from '@testing-library/react';
import { Container } from './Container';

describe('Container component', () => {
  it('should render correctly', () => {
    const MOCK_TEXT = 'test text';

    const { findByText } = render(<Container>{MOCK_TEXT}</Container>);

    const container = findByText(MOCK_TEXT);

    expect(container).toBeTruthy();
  });

  it('should correctly render div inside the container', () => {
    const MOCK_TEXT = 'test text';

    const { findByText } = render(
      <Container>
        <div>{MOCK_TEXT}</div>
      </Container>
    );

    const divInsideComponent = findByText(MOCK_TEXT);

    expect(divInsideComponent).toBeTruthy();
  });
});
