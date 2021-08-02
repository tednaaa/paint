import { useLayoutEffect, useState, FC, useRef } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Canvas, SettingBar, ToolBar } from './components';
import { generateSymbols } from './utils';

export const App: FC = () => {
  const toolBarRef = useRef<HTMLDivElement>(null);
  const settingBarRef = useRef<HTMLDivElement>(null);
  const [offsetOfTopElements, setOffsetOfTopElements] = useState(0);

  useLayoutEffect(() => {
    const toolBarElement = toolBarRef.current;
    const settingBarElement = settingBarRef.current;

    if (toolBarElement && settingBarElement) {
      setOffsetOfTopElements(
        toolBarElement.clientHeight + settingBarElement.clientHeight
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/:id">
            <ToolBar toolBarRef={toolBarRef} />
            <SettingBar settingBarRef={settingBarRef} />
            <Canvas offsetOfTopElements={offsetOfTopElements} />
          </Route>
          <Redirect to={generateSymbols(16)} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
