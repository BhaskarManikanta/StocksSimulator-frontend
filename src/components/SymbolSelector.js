import "./SymbolSelector.css";

const SymbolSelector = ({ symbols, selected, onChange }) => {
  return (
    <div className="symbol-selector">
      <label>Select Stock: </label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SymbolSelector;
