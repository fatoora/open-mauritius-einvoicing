import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterName } from "./constants/Constants";
import Dashboard from "./pages/dashboard/Dashboard";
import OnBoard from "./pages/device/OnBoard";
import InvoiceList from "./pages/invoices/InvoiceList";
import CreateInvoice from "./pages/invoices/Invoice";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import SignIn from "./pages/Login/Login.jsx";
import InvoicePrint from "./pages/invoices/invoicePrint/InvoicePrint";
import ChangePassword from "./pages/Login/ChangePassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RouterName.SIGN_IN} element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={RouterName.DASHBOARD} element={<Dashboard />} />
          <Route path={RouterName.INVOICES} element={<InvoiceList />} />
          <Route path={RouterName.ON_BOARD} element={<OnBoard />} />
          <Route path={RouterName.CREATE_INVOICE} element={<CreateInvoice />} />
          <Route path={RouterName.PRINT_INVOICE} element={<InvoicePrint />} />
          <Route
            path={RouterName.CHANGE_PASSWORD}
            element={<ChangePassword />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
