import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from "./pages/Home";
import Savings from "./pages/Savings";
import Expenditure from "./pages/Expenditure";
import AllExpenditure from "./pages/AllExpenditure";
import Investment from "./pages/Investment";
import AllInvestments from "./pages/AllInvestments";
import UserProfile from "./pages/UserProfile";


import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";


import Loader from './components/Loader';


const App = () => {

  const { loading } = useSelector((state) => state.alertLoad);

  return (
    <div>

      {loading && <Loader />}

      <BrowserRouter>

        <Routes>

          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/savings" element={<ProtectedRoutes><Savings /></ProtectedRoutes>} />
          <Route path="/expenditure" element={<ProtectedRoutes><Expenditure /></ProtectedRoutes>} />
          <Route path="/all-expenditures" element={<ProtectedRoutes><AllExpenditure /></ProtectedRoutes>} />
          <Route path="/investment" element={<ProtectedRoutes><Investment /></ProtectedRoutes>} />
          <Route path="/all-investments" element={<ProtectedRoutes><AllInvestments /></ProtectedRoutes>} />
          <Route path="/user-profile" element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
          <Route path="/" element={<PublicRoutes><LandingPage /></PublicRoutes>} />

        </Routes>

      </BrowserRouter>

    </div>
  )
};

export default App;