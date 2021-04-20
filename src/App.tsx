import { Canvas } from "./components/Canvas"
import { SettingBar } from "./components/SettingBar"
import { ToolBar } from "./components/ToolBar"

export const App: React.FC = () => {
  return <div className="app">
    <ToolBar />
    <SettingBar />
    <Canvas />
  </div>;
};
