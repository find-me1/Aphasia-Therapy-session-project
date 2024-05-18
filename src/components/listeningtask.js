import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../stylesheets/Homepage1.css";
//import voiceIcon from "../assets/icon.png";
const pageloadspeech = [
  {
    Q: "Hello! Welcome to your listening therapy session. Are you ready to get started?",
  },
  {
    Q: "Great!  Exercise 1 is : Listen and select the picture",
  },
  {
    Q: "the  Exercise 2 is : Listen and choose the word .",
  },
  {
    Q: "And Exercise 3 : listen and select the letter that you hear.",
  },
  {
    Q: "Lets get started",
  },
];

export default function HomePage() {
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
      <header className="header">
        <h1>Let's Start Your Listening Therapy Session</h1>
      </header>
      <div className="Hfirstdiv">
        <div>
          <NavLink to="/listeningtherapy1dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                  <FontAwesomeIcon icon={faImage} className="fa-image" />
                </span>
              </span>
              <p className="Hp1">Listen and Select Picture </p>
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/listeningtherapy2dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p>Apple Cat Bike</p>
                </span>
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p>India Sun Hero</p>
                </span>
                <span className="Hspanw1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p>Sugar Red Tv</p>
                </span>
              </span>
              <p className="Hp1">Listen and Select Word </p>
            </span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/listeningtherapy3dayspage" className={"navlink"}>
            <span className="Hspan1">
              <span className="Hspan2">
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p> S R T</p>
                </span>
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p> A B C</p>
                </span>
                <span className="HspanL1">
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="fa-volume-high"
                    style={{ fontSize: "20px" }}
                  />
                  <p> H N P</p>
                </span>
              </span>
              <p className="Hp1">Listen and Select Letter </p>
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
