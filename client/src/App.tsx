import { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthModal, Canvas, SettingBar, ToolBar } from './components';

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
