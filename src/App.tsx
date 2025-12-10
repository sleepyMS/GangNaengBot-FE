import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatPage, LoginPage } from "@/pages";
import { ToastContainer } from "@/components/common";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
