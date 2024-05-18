import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../stylesheets/Homepage1.css";

import voiceIcon from "../assets/icon11.png";
import speakIcon from "../assets/icons12.png";
import speak2Icon from "../assets/icon13.png";
const pageloadspeech = [
  {
    Q: "Hello! Welcome to your speaking therapy session. Are you ready to get started !",
  },
  {
    Q: "Great! Exercise 1 is : Listen and speak the letter",
  },
  {
    Q: "the  Exercise 2 is : Listen and speak the word .",
  },
  {
    Q: "And Exercise 3 : listen and spell the word.",
  },
  {
    Q: "Lets get started",
  },
];

export default function HomePage() {
  useEffect(() => {
    for (let i = 0; i < pageloadspeech.length; i++) {
      const speech = new SpeechSynthesisUtterance(pageloadspeech[i].Q);

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
      <header className="header">
        <h1>Let's Start Your Speaking Therapy Session</h1>
      </header>
      <div className="Hfirstdiv">
        <div>
          <NavLink to="/speakingtherapy1dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span className="HspanL1">
                  <img
                    src={speakIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p> S R T</p>
                </span>
                <span className="HspanL1">
                  <img
                    src={speakIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p> H N P</p>
                </span>
                <span className="HspanL1">
                  <img
                    src={speakIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p> A B C</p>
                </span>
              </span>
              <p className="Hp1">Listen and Speak Letter </p>
              <FontAwesomeIcon icon="fa-duotone fa-image" />
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/speakingtherapy2dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p>Apple </p>
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p> Sound </p>
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <p> Sugar </p>
                  <img
                    src={voiceIcon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
              </span>
              <p className="Hp1">Listen and Speak Word</p>
              <FontAwesomeIcon icon="fa-duotone fa-image" />
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/speakingtherapy3dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                  <img
                    src={speak2Icon}
                    alt="Voice Icon"
                    width="26"
                    height="26"
                  />
                </span>
              </span>
              <p className="Hp1">See and Spell word </p>
              <FontAwesomeIcon icon="fa-duotone fa-image" />
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
