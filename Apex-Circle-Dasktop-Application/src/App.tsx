import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import DashboardPage from "./features/Dashboard/v1/Pages/DashboardPage";
import MemberPage from "./features/Member/v1/Pages/MemberPage";
import LoginUserTemplate from "./features/template/LoginUserTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUserTemplate />}>
          <Route index element={<DashboardPage />} />
          <Route path="member" element={<MemberPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
