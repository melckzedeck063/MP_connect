import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./components";
import Login from "./components/Login";
import AllMp from "./components/AllMp";
import Questions from "./components/Questions";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/protect";
import Dashboard from "./components/dashboard";


function App() {
  return (
 <BrowserRouter>
   <AuthProvider>
    <Routes>
      <Route path="/" element={<Index  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
      <Route path="/all_mps" element={ <ProtectedRoute> <AllMp /> </ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute> <Questions /> </ProtectedRoute>}  />
    </Routes>
    </AuthProvider>
 </BrowserRouter>
  );
}

export default App;
