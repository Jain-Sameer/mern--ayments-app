import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Components/Signup";
import { Signin } from "./Components/Signin";
import { Dashboard } from "./Components/Dashboard";
import { SendMoney } from "./Components/SendMoney";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
