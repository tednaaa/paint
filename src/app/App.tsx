import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './providers/AppRoutes';

export const App: FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
