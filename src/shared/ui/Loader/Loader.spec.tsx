import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Container component', () => {
  it('should render correctly', () => {
    const { findByText } = render(<Loader />);

    const loader = findByText('loading ...');

    expect(loader).toBeTruthy();
  });
});
