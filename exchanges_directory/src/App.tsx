import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Exchange from "./pages/Exchange";

function App() {
  return (
    <div className="p-4 max-w-6xl xl:max-w-3xl mx-auto transition-all">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange/:id" element={<Exchange />} />
      </Routes>
    </div>
  );
}

export default App;
