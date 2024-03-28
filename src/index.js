import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Therapysession from "./pages/Therapysession";
//import HomePage from "./pages/homepage";
import Pagenotfound from "./pages/pagenotfound";
import AppLayout from "./pages/AppLayout";
import Header from "./pages/Header";

function App() {
  //const [isImgVisible, setIsImgVisible] = useState(true);

  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="therapysession" element={<AppLayout />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
