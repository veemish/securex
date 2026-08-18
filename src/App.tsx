import { BrowserRouter, Route, Routes } from "react-router-dom";
import Patients from "./assets/Components/Patients";
import PatientDetail from "./assets/Components/PatientDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetail registrationId={""} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
