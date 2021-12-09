import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Container } from './Container';

describe('Container component', () => {
  it('should render correctly', () => {
    const MOCK_TEXT = 'test text';

    const { getByText } = render(<Container>{MOCK_TEXT}</Container>);

    const container = getByText(MOCK_TEXT);

    expect(container).toBeInTheDocument();
  });

  it('should correctly render div inside the container', () => {
    const MOCK_TEXT = 'test text';

    const { getByText } = render(
      <Container>
        <div>{MOCK_TEXT}</div>
      </Container>
    );

    const divInsideComponent = getByText(MOCK_TEXT);
    expect(divInsideComponent).toBeInTheDocument();
  });
});
