import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
