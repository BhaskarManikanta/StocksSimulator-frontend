import "./SymbolSelector.css";
import { motion } from "framer-motion";

const SymbolSelector = ({ symbols, selected, onChange }) => {
  return (
    <motion.div
      className="symbol-selector"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="symbol-label">📊 Select Stock</label>
      <div className="selector-wrapper">
        <select
          className="symbol-dropdown"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {symbols.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default SymbolSelector;
