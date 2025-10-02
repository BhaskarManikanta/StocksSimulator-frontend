import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

function App() {
  const { token } = useSelector((state) => state.auth);
  const [showRegister, setShowRegister] = useState(false);

  if (token) {
    return <Dashboard />;
  }

  return (
    <div>
      {showRegister ? (
        <Register onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
