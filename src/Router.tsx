import { Navigate, Route, Routes } from "react-router";
import App from "./pages/App";

export default function Router() {
  return (
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
