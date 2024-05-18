// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pagenotfound from "./components/pagenotfound.js";
import HomePage from "./components/HomePage1.js";
import SelectPicture from "./pages/selectpicture.js";
import SelectWord from "./pages/selectword.js";
import SelectLetter from "./pages/selectletter.js";
import DaysPage from "./pages/dayspage.js";
import SpeakWord from "./pages/speakword.js";
import SpeakLetter from "./pages/speakletter.js";
import SpellTheWord from "./pages/spelltheword.js";
import Listening from "./components/listeningtask.js";
import Speaking from "./components/speakingtask.js";

import { DaysUnlockedProvider } from "./pages/daysunlockedcontext.js";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/listeningtherapy1dayspage"
          element={<DaysPage exercise="listening3" />}
        />
        <Route
          path="/listeningtherapy2dayspage"
          element={<DaysPage exercise="listening2" />}
        />
        <Route
          path="/listeningtherapy3dayspage"
          element={<DaysPage exercise="listening1" />}
        />
        <Route
          path="/speakingtherapy1dayspage"
          element={<DaysPage exercise="speaking1" />}
        />
        <Route
          path="/speakingtherapy2dayspage"
          element={<DaysPage exercise="speaking2" />}
        />
        <Route
          path="/speakingtherapy3dayspage"
          element={<DaysPage exercise="speaking3" />}
        />
        <Route path="/listening" element={<Listening />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route
          path="/selectlistening3/:dayNumber"
          element={<SelectPicture />}
        />
        <Route path="/selectlistening2/:dayNumber" element={<SelectWord />} />
        <Route path="/selectlistening1/:dayNumber" element={<SelectLetter />} />
        <Route path="/selectspeaking1/:dayNumber" element={<SpeakLetter />} />
        <Route path="/selectspeaking2/:dayNumber" element={<SpeakWord />} />
        <Route path="/selectspeaking3/:dayNumber" element={<SpellTheWord />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DaysUnlockedProvider>
        <App />
      </DaysUnlockedProvider>
    </BrowserRouter>
  </React.StrictMode>
);
