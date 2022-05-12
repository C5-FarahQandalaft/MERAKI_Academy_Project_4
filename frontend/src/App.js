import "./App.css";

// import routes
import { Routes, Route } from "react-router-dom";

//importing components
import { Navbar } from "./components/Navbar";
import { RegisterCompany } from "./components/Register/Company/index";
import { RegisterEmployee } from "./components/Register/Employee/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/register/company" element={<RegisterCompany />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
