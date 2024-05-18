// src/pages/dayspage.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DaysUnlockedContext from "./daysunlockedcontext.js";
import "../stylesheets/dayspage.css";

export default function DaysPage({ exercise }) {
  const { daysUnlocked } = useContext(DaysUnlockedContext);
  const navigate = useNavigate();

  const handleDayClick = (day) => {
    if (daysUnlocked[exercise][day - 1]) {
      navigate(`/select${exercise}/${day}`);
    }
  };
  const currentDay =
    daysUnlocked[exercise].findIndex((unlocked) => !unlocked) + 1;
  const pageloadspeech = [
    {
      Q: "Let's continue with your progress!",
    },
    {
      Q: `Great job! You are on day ${currentDay - 1}.`,
    },
    {
      Q: `Select day ${
        currentDay - 1
      } to begin your exercise and keep improving!`,
    },
  ];

  useEffect(() => {
    for (let i = 0; i < pageloadspeech.length; i++) {
      const speech = new SpeechSynthesisUtterance(pageloadspeech[i].Q);

      // Example: Set the voice to a female voice in Edge
      const voice = window.speechSynthesis
        .getVoices()
        .find(
          (voice) => voice.name === "Microsoft Zira - English (United States)"
        );
      if (voice) {
        speech.voice = voice;
        window.speechSynthesis.speak(speech);
      }
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  });
  return (
    <>
      <div className="days">
        <h2>Let's Continue with your progress</h2>
        <h3>You are on day{currentDay - 1}</h3>
        <div className="button-container">
          {daysUnlocked[exercise].map((unlocked, index) => (
            <button
              key={index}
              onClick={() => handleDayClick(index + 1)}
              disabled={!unlocked}
            >
              Day {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
