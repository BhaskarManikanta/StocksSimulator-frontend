import "./SymbolSelector.css";
import { motion } from "framer-motion";

const SymbolSelector = ({
  symbols,
  selected,
  onChange,
}) => {
  return (
    <motion.div
      className="symbol-selector"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >

      {/* LABEL */}
      <div className="selector-header">

        <div>
          <h3>Select Stock</h3>
          <p>Choose a stock to monitor live prices</p>
        </div>

        <div className="live-badge">
          LIVE
        </div>

      </div>

      {/* SELECT BOX */}
      <div className="selector-wrapper">

        <div className="selector-icon">
          📈
        </div>

        <select
          className="symbol-dropdown"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {symbols.map((symbol) => (
            <option
              key={symbol}
              value={symbol}
            >
              {symbol}
            </option>
          ))}
        </select>

      </div>
    </motion.div>
  );
};

export default SymbolSelector;