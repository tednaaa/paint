import React from 'react';
import { routeNames } from '@/shared/router';
import { CanvasPage } from './canvas';

export const publicRoutes = [
  {
    path: `${routeNames.CANVAS}/:imageId`,
    element: <CanvasPage />,
  },
];
