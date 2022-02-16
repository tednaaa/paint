import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './app-router';

describe('AppRouter provider', () => {
  it('should render correctly generate imageId route if its not specified', () => {
    const ROOT_LOCATION = '/';

    render(
      <Router>
        <AppRoutes />
      </Router>
    );

    expect(window.location.pathname).not.toBe(ROOT_LOCATION);
  });
});
