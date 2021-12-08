import React, { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router';
import { generateSymbols } from '@/shared/lib';
import { publicRoutes } from '@/pages/router';

export const AppRouter = () => {
  const routes = useRoutes(publicRoutes);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(`/${generateSymbols(32)}`);
    }
  }, []);

  return routes;
};
