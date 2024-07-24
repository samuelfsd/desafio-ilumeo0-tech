import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import { Point } from "./pages/point";
import { Registration } from "./pages/registration";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/ponto" element={<Point />} />
          <Route path="cadastro" element={<Registration /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

