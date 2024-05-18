import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/Homepage1.css";
import h1SpeakingImage from "../assets/speaking.jpeg";
import h1ListeningImage from "../assets/listening.webp";
import Footer from "./footer";

export default function HomePage() {
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(
      "Welcome To Aphasia Therapy Session . We're glad you're here. Let's get started! . Please select one of the therapies: listening or speaking. If you need help at any time, just ask. Let's work together towards better communication! "
    );

    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(
        (voice) => voice.name === "Microsoft Zira - English (United States)"
      );
      console.log("Available voices:", voices);
      if (voice) {
        console.log("Selected voice:", voice);
        speech.voice = voice;
        window.speechSynthesis.speak(speech);
      } else {
        console.log("Voice not available:", voice);
      }
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <>
      <header className="header">
        <h1>Welcome To Aphasia Therapy Session</h1>
      </header>
      <div className="H1firstdiv">
        <div>
          <NavLink to="/listening" className={"navlink"}>
            <span className="H1span1">
              <img src={h1ListeningImage} alt="Listening Icon" />
              <p className="H1p1">Listening Therapy</p>
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/speaking" className={"navlink"}>
            <span className="H1span2">
              <img src={h1SpeakingImage} alt="Speaking Icon" />
              <p className="H1p1">Speaking Therapy </p>
            </span>
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
}
