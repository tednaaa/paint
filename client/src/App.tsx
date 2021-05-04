import { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthModal } from './components/AuthModal';
import { Canvas } from './components/Canvas';
import { SettingBar } from './components/SettingBar';
import { ToolBar } from './components/ToolBar';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <AuthModal />
            <ToolBar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
