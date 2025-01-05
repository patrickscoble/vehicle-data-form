import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./components/Form";
import { Results } from "./components/Results";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/upload" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
