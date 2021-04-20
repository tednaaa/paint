import '../styles/toolbar.scss';

export const ToolBar: React.FC = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <button className="toolbar-item toolbar-item--brush"></button>
        <button className="toolbar-item toolbar-item--rect"></button>
        <button className="toolbar-item toolbar-item--circle"></button>
        <button className="toolbar-item toolbar-item--eraser"></button>
        <button className="toolbar-item toolbar-item--line"></button>
        <input className="toolbar-item" type="color" />
      </div>
      <div className="toolbar__right">
        <button className="toolbar-item toolbar-item--undo"></button>
        <button className="toolbar-item toolbar-item--redo"></button>
        <button className="toolbar-item toolbar-item--save"></button>
      </div>
    </div>
  );
};
