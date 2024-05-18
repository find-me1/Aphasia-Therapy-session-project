import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/Homepage1.css";
import h1SpeakingImage from "../assets/speaking.jpeg";
import h1ListeningImage from "../assets/listening.webp";
import Footer from "./footer";
const pageloadspeech = [
  { Q: "Welcome to your Aphasia Therapy Session!" },
  { Q: "We're glad you're here. Let's get started!" },
  { Q: "Please select one of the therapies: listening or speaking." },
  { Q: "If you need help at any time, just ask." },
  { Q: "Let's work together towards better communication!" },
];

export default function HomePage() {
  useEffect(() => {
    const speakQuestions = () => {
      for (let i = 0; i < pageloadspeech.length; i++) {
        const speech = new SpeechSynthesisUtterance(pageloadspeech[i].Q);
        const voice = window.speechSynthesis
          .getVoices()
          .find(
            (voice) => voice.name === "Microsoft Zira - English (United States)"
          );
        if (voice) {
          speech.voice = voice;
        }
        window.speechSynthesis.speak(speech);
      }
    };
    speakQuestions();

    return () => {
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
