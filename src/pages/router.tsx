import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/shared/lib/routes';

import { RootPage } from './root';

export const router = createBrowserRouter([
  {
    path: routes.ROOT,
    element: <RootPage />,
  },
]);
