import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "../stylesheets/selectword.css";
import DaysUnlockedContext from "./daysunlockedcontext";

const therapyQuestions = {
  day1: [
    { Q: "W", Q1: ["T", false], Q2: ["W", true], Q3: ["K", false] },
    { Q: "E", Q1: ["E", true], Q2: ["L", false], Q3: ["C", false] },
    { Q: "W", Q1: ["W", true], Q2: ["P", false], Q3: ["C", false] },
    { Q: "I", Q1: ["I", true], Q2: ["B", false], Q3: ["N", false] },
  ],
  day2: [
    { Q: "I", Q1: ["J", false], Q2: ["P", false], Q3: ["I", true] },
    { Q: "Q", Q1: ["Q", true], Q2: ["N", false], Q3: ["T", false] },
    { Q: "C", Q1: ["N", false], Q2: ["E", false], Q3: ["C", true] },
    { Q: "N", Q1: ["N", true], Q2: ["C", false], Q3: ["P", false] },
    { Q: "X", Q1: ["G", false], Q2: ["X", true], Q3: ["K", false] },
    { Q: "W", Q1: ["Z", false], Q2: ["J", false], Q3: ["W", true] },
    { Q: "L", Q1: ["I", false], Q2: ["L", true], Q3: ["X", false] },
    { Q: "U", Q1: ["O", false], Q2: ["P", false], Q3: ["U", true] },
    { Q: "G", Q1: ["G", true], Q2: ["I", false], Q3: ["A", false] },
    { Q: "N", Q1: ["E", false], Q2: ["N", true], Q3: ["Q", false] },
    { Q: "X", Q1: ["A", false], Q2: ["X", true], Q3: ["G", false] },
    { Q: "I", Q1: ["O", false], Q2: ["M", false], Q3: ["I", true] },
    { Q: "I", Q1: ["F", false], Q2: ["I", true], Q3: ["M", false] },
    { Q: "J", Q1: ["K", false], Q2: ["J", true], Q3: ["X", false] },
    { Q: "T", Q1: ["B", false], Q2: ["H", false], Q3: ["T", true] },
    { Q: "M", Q1: ["S", false], Q2: ["M", true], Q3: ["W", false] },
    { Q: "E", Q1: ["H", false], Q2: ["E", true], Q3: ["P", false] },
    { Q: "J", Q1: ["W", false], Q2: ["J", true], Q3: ["U", false] },
    { Q: "F", Q1: ["Z", false], Q2: ["F", true], Q3: ["Q", false] },
    { Q: "Y", Q1: ["I", false], Q2: ["Y", true], Q3: ["C", false] },
  ],
  day3: [
    { Q: "I", Q1: ["G", false], Q2: ["I", true], Q3: ["E", false] },
    { Q: "D", Q1: ["N", false], Q2: ["D", true], Q3: ["C", false] },
    { Q: "Z", Q1: ["L", false], Q2: ["Z", true], Q3: ["M", false] },
    { Q: "M", Q1: ["K", false], Q2: ["V", false], Q3: ["M", true] },
    { Q: "P", Q1: ["P", true], Q2: ["T", false], Q3: ["L", false] },
    { Q: "R", Q1: ["L", false], Q2: ["V", false], Q3: ["R", true] },
    { Q: "F", Q1: ["K", false], Q2: ["E", false], Q3: ["F", true] },
    { Q: "O", Q1: ["J", false], Q2: ["O", true], Q3: ["H", false] },
    { Q: "L", Q1: ["K", false], Q2: ["L", true], Q3: ["W", false] },
    { Q: "T", Q1: ["X", false], Q2: ["T", true], Q3: ["U", false] },
    { Q: "K", Q1: ["N", false], Q2: ["C", false], Q3: ["K", true] },
    { Q: "P", Q1: ["G", false], Q2: ["R", false], Q3: ["P", true] },
    { Q: "D", Q1: ["A", false], Q2: ["D", true], Q3: ["T", false] },
    { Q: "C", Q1: ["C", true], Q2: ["F", false], Q3: ["K", false] },
    { Q: "Y", Q1: ["X", false], Q2: ["G", false], Q3: ["Y", true] },
    { Q: "O", Q1: ["O", true], Q2: ["L", false], Q3: ["P", false] },
    { Q: "C", Q1: ["A", false], Q2: ["K", false], Q3: ["C", true] },
    { Q: "W", Q1: ["R", false], Q2: ["W", true], Q3: ["M", false] },
    { Q: "F", Q1: ["P", false], Q2: ["A", false], Q3: ["F", true] },
    { Q: "A", Q1: ["E", false], Q2: ["S", false], Q3: ["A", true] },
  ],
  day4: [
    { Q: "I", Q1: ["I", true], Q2: ["X", false], Q3: ["E", false] },
    { Q: "G", Q1: ["P", false], Q2: ["W", false], Q3: ["G", true] },
    { Q: "L", Q1: ["A", false], Q2: ["L", true], Q3: ["Y", false] },
    { Q: "Q", Q1: ["X", false], Q2: ["Q", true], Q3: ["M", false] },
    { Q: "B", Q1: ["F", false], Q2: ["Q", false], Q3: ["B", true] },
    { Q: "Y", Q1: ["Y", true], Q2: ["R", false], Q3: ["Z", false] },
    { Q: "J", Q1: ["J", true], Q2: ["M", false], Q3: ["X", false] },
    { Q: "P", Q1: ["O", false], Q2: ["F", false], Q3: ["P", true] },
    { Q: "N", Q1: ["C", false], Q2: ["N", true], Q3: ["K", false] },
    { Q: "S", Q1: ["I", false], Q2: ["S", true], Q3: ["X", false] },
    { Q: "Q", Q1: ["R", false], Q2: ["I", false], Q3: ["Q", true] },
    { Q: "M", Q1: ["M", true], Q2: ["F", false], Q3: ["Z", false] },
    { Q: "O", Q1: ["B", false], Q2: ["Z", false], Q3: ["O", true] },
    { Q: "Y", Q1: ["Z", false], Q2: ["Y", true], Q3: ["E", false] },
    { Q: "V", Q1: ["G", false], Q2: ["V", true], Q3: ["W", false] },
    { Q: "F", Q1: ["F", true], Q2: ["E", false], Q3: ["L", false] },
    { Q: "Q", Q1: ["Z", false], Q2: ["F", false], Q3: ["Q", true] },
    { Q: "O", Q1: ["O", true], Q2: ["C", false], Q3: ["R", false] },
    { Q: "M", Q1: ["M", true], Q2: ["E", false], Q3: ["Y", false] },
    { Q: "Z", Q1: ["Z", true], Q2: ["M", false], Q3: ["C", false] },
  ],
  day5: [
    { Q: "J", Q1: ["J", true], Q2: ["F", false], Q3: ["K", false] },
    { Q: "U", Q1: ["A", false], Q2: ["U", true], Q3: ["Q", false] },
    { Q: "X", Q1: ["X", true], Q2: ["T", false], Q3: ["P", false] },
    { Q: "Z", Q1: ["Z", true], Q2: ["E", false], Q3: ["P", false] },
    { Q: "K", Q1: ["K", true], Q2: ["R", false], Q3: ["I", false] },
    { Q: "U", Q1: ["O", false], Q2: ["U", true], Q3: ["L", false] },
    { Q: "L", Q1: ["Z", false], Q2: ["M", false], Q3: ["L", true] },
    { Q: "L", Q1: ["F", false], Q2: ["L", true], Q3: ["V", false] },
    { Q: "T", Q1: ["T", true], Q2: ["C", false], Q3: ["M", false] },
    { Q: "H", Q1: ["H", true], Q2: ["N", false], Q3: ["S", false] },
    { Q: "R", Q1: ["A", false], Q2: ["R", true], Q3: ["C", false] },
    { Q: "M", Q1: ["E", false], Q2: ["M", true], Q3: ["I", false] },
    { Q: "S", Q1: ["X", false], Q2: ["R", false], Q3: ["S", true] },
    { Q: "W", Q1: ["U", false], Q2: ["I", false], Q3: ["W", true] },
    { Q: "E", Q1: ["U", false], Q2: ["E", true], Q3: ["S", false] },
    { Q: "Z", Q1: ["E", false], Q2: ["D", false], Q3: ["Z", true] },
    { Q: "B", Q1: ["B", true], Q2: ["N", false], Q3: ["T", false] },
    { Q: "R", Q1: ["R", true], Q2: ["P", false], Q3: ["U", false] },
    { Q: "S", Q1: ["B", false], Q2: ["V", false], Q3: ["S", true] },
    { Q: "P", Q1: ["L", false], Q2: ["T", false], Q3: ["P", true] },
  ],
  day6: [
    { Q: "F", Q1: ["S", false], Q2: ["I", false], Q3: ["F", true] },
    { Q: "A", Q1: ["A", true], Q2: ["W", false], Q3: ["V", false] },
    { Q: "G", Q1: ["O", false], Q2: ["G", true], Q3: ["U", false] },
    { Q: "G", Q1: ["A", false], Q2: ["J", false], Q3: ["G", true] },
    { Q: "F", Q1: ["F", true], Q2: ["N", false], Q3: ["V", false] },
    { Q: "M", Q1: ["W", false], Q2: ["N", false], Q3: ["M", true] },
    { Q: "P", Q1: ["K", false], Q2: ["S", false], Q3: ["P", true] },
    { Q: "J", Q1: ["I", false], Q2: ["Z", false], Q3: ["J", true] },
    { Q: "B", Q1: ["J", false], Q2: ["B", true], Q3: ["E", false] },
    { Q: "T", Q1: ["U", false], Q2: ["T", true], Q3: ["J", false] },
    { Q: "S", Q1: ["Q", false], Q2: ["S", true], Q3: ["Y", false] },
    { Q: "H", Q1: ["U", false], Q2: ["B", false], Q3: ["H", true] },
    { Q: "S", Q1: ["M", false], Q2: ["B", false], Q3: ["S", true] },
    { Q: "X", Q1: ["X", true], Q2: ["P", false], Q3: ["T", false] },
    { Q: "F", Q1: ["N", false], Q2: ["F", true], Q3: ["G", false] },
    { Q: "I", Q1: ["S", false], Q2: ["U", false], Q3: ["I", true] },
    { Q: "Y", Q1: ["Y", true], Q2: ["P", false], Q3: ["J", false] },
    { Q: "Q", Q1: ["C", false], Q2: ["D", false], Q3: ["Q", true] },
    { Q: "N", Q1: ["E", false], Q2: ["N", true], Q3: ["F", false] },
    { Q: "S", Q1: ["S", true], Q2: ["K", false], Q3: ["V", false] },
  ],
  day7: [
    { Q: "W", Q1: ["G", false], Q2: ["C", false], Q3: ["W", true] },
    { Q: "U", Q1: ["C", false], Q2: ["U", true], Q3: ["W", false] },
    { Q: "L", Q1: ["W", false], Q2: ["B", false], Q3: ["L", true] },
    { Q: "E", Q1: ["C", false], Q2: ["E", true], Q3: ["K", false] },
    { Q: "U", Q1: ["B", false], Q2: ["U", true], Q3: ["L", false] },
    { Q: "H", Q1: ["H", true], Q2: ["G", false], Q3: ["U", false] },
    { Q: "K", Q1: ["C", false], Q2: ["K", true], Q3: ["I", false] },
    { Q: "I", Q1: ["Q", false], Q2: ["K", false], Q3: ["I", true] },
    { Q: "A", Q1: ["U", false], Q2: ["A", true], Q3: ["D", false] },
    { Q: "B", Q1: ["B", true], Q2: ["I", false], Q3: ["E", false] },
    { Q: "V", Q1: ["O", false], Q2: ["C", false], Q3: ["V", true] },
    { Q: "K", Q1: ["H", false], Q2: ["V", false], Q3: ["K", true] },
    { Q: "I", Q1: ["L", false], Q2: ["Y", false], Q3: ["I", true] },
    { Q: "W", Q1: ["A", false], Q2: ["W", true], Q3: ["V", false] },
    { Q: "N", Q1: ["X", false], Q2: ["J", false], Q3: ["N", true] },
    { Q: "A", Q1: ["G", false], Q2: ["H", false], Q3: ["A", true] },
    { Q: "U", Q1: ["U", true], Q2: ["X", false], Q3: ["K", false] },
    { Q: "U", Q1: ["T", false], Q2: ["U", true], Q3: ["C", false] },
    { Q: "Z", Q1: ["Z", true], Q2: ["V", false], Q3: ["I", false] },
    { Q: "Z", Q1: ["W", false], Q2: ["T", false], Q3: ["Z", true] },
  ],
  day8: [
    { Q: "G", Q1: ["N", false], Q2: ["G", true], Q3: ["H", false] },
    { Q: "E", Q1: ["F", false], Q2: ["Q", false], Q3: ["E", true] },
    { Q: "Z", Q1: ["Z", true], Q2: ["V", false], Q3: ["X", false] },
    { Q: "A", Q1: ["V", false], Q2: ["E", false], Q3: ["A", true] },
    { Q: "F", Q1: ["B", false], Q2: ["F", true], Q3: ["D", false] },
    { Q: "O", Q1: ["O", true], Q2: ["L", false], Q3: ["Q", false] },
    { Q: "S", Q1: ["S", true], Q2: ["D", false], Q3: ["C", false] },
    { Q: "D", Q1: ["O", false], Q2: ["D", true], Q3: ["G", false] },
    { Q: "V", Q1: ["V", true], Q2: ["D", false], Q3: ["R", false] },
    { Q: "M", Q1: ["C", false], Q2: ["M", true], Q3: ["B", false] },
    { Q: "Y", Q1: ["Y", true], Q2: ["T", false], Q3: ["I", false] },
    { Q: "A", Q1: ["T", false], Q2: ["A", true], Q3: ["E", false] },
    { Q: "M", Q1: ["Q", false], Q2: ["M", true], Q3: ["S", false] },
    { Q: "D", Q1: ["A", false], Q2: ["U", false], Q3: ["D", true] },
    { Q: "C", Q1: ["D", false], Q2: ["X", false], Q3: ["C", true] },
    { Q: "H", Q1: ["V", false], Q2: ["H", true], Q3: ["I", false] },
    { Q: "L", Q1: ["L", true], Q2: ["V", false], Q3: ["O", false] },
    { Q: "I", Q1: ["P", false], Q2: ["K", false], Q3: ["I", true] },
    { Q: "P", Q1: ["Q", false], Q2: ["N", false], Q3: ["P", true] },
    { Q: "Q", Q1: ["Q", true], Q2: ["G", false], Q3: ["A", false] },
  ],
  day9: [
    { Q: "V", Q1: ["V", true], Q2: ["Q", false], Q3: ["H", false] },
    { Q: "S", Q1: ["H", false], Q2: ["B", false], Q3: ["S", true] },
    { Q: "Y", Q1: ["Q", false], Q2: ["A", false], Q3: ["Y", true] },
    { Q: "B", Q1: ["V", false], Q2: ["B", true], Q3: ["N", false] },
    { Q: "J", Q1: ["C", false], Q2: ["B", false], Q3: ["J", true] },
    { Q: "I", Q1: ["I", true], Q2: ["D", false], Q3: ["L", false] },
    { Q: "O", Q1: ["N", false], Q2: ["J", false], Q3: ["O", true] },
    { Q: "A", Q1: ["O", false], Q2: ["R", false], Q3: ["A", true] },
    { Q: "P", Q1: ["E", false], Q2: ["O", false], Q3: ["P", true] },
    { Q: "T", Q1: ["T", true], Q2: ["M", false], Q3: ["K", false] },
    { Q: "J", Q1: ["E", false], Q2: ["J", true], Q3: ["G", false] },
    { Q: "A", Q1: ["J", false], Q2: ["A", true], Q3: ["L", false] },
    { Q: "F", Q1: ["F", true], Q2: ["M", false], Q3: ["L", false] },
    { Q: "R", Q1: ["R", true], Q2: ["U", false], Q3: ["F", false] },
    { Q: "E", Q1: ["Q", false], Q2: ["E", true], Q3: ["U", false] },
    { Q: "Y", Q1: ["A", false], Q2: ["P", false], Q3: ["Y", true] },
    { Q: "T", Q1: ["A", false], Q2: ["T", true], Q3: ["N", false] },
    { Q: "N", Q1: ["H", false], Q2: ["N", true], Q3: ["Z", false] },
    { Q: "R", Q1: ["A", false], Q2: ["D", false], Q3: ["R", true] },
  ],
  day10: [
    [
      { Q: "V", Q1: ["V", true], Q2: ["B", false], Q3: ["H", true] },
      { Q: "S", Q1: ["H", false], Q2: ["S", true], Q3: ["B", false] },
      { Q: "Y", Q1: ["Q", false], Q2: ["Y", true], Q3: ["A", false] },
      { Q: "B", Q1: ["V", false], Q2: ["B", true], Q3: ["N", true] },
      { Q: "B", Q1: ["C", false], Q2: ["B", true], Q3: ["J", false] },
      { Q: "I", Q1: ["I", true], Q2: ["D", false], Q3: ["L", false] },
      { Q: "O", Q1: ["N", false], Q2: ["O", true], Q3: ["J", false] },
      { Q: "A", Q1: ["O", false], Q2: ["A", true], Q3: ["R", false] },
      { Q: "P", Q1: ["E", false], Q2: ["P", true], Q3: ["O", false] },
      { Q: "K", Q1: ["T", true], Q2: ["M", false], Q3: ["K", true] },
      { Q: "J", Q1: ["E", false], Q2: ["J", true], Q3: ["G", false] },
      { Q: "A", Q1: ["J", false], Q2: ["A", true], Q3: ["L", true] },
      { Q: "F", Q1: ["F", true], Q2: ["M", false], Q3: ["L", false] },
      { Q: "R", Q1: ["R", true], Q2: ["U", false], Q3: ["F", false] },
      { Q: "E", Q1: ["Q", false], Q2: ["U", false], Q3: ["E", true] },
      { Q: "Y", Q1: ["A", false], Q2: ["P", false], Q3: ["Y", true] },
      { Q: "N", Q1: ["A", false], Q2: ["T", true], Q3: ["N", true] },
      { Q: "H", Q1: ["H", true], Q2: ["N", false], Q3: ["Z", false] },
      { Q: "R", Q1: ["A", false], Q2: ["D", false], Q3: ["R", true] },
      { Q: "Z", Q1: ["W", false], Q2: ["T", false], Q3: ["Z", true] },
    ],
  ],
};

const pageloadspeech = [
  {
    Q: "Click on the play button to listen to the Question.",
  },
  {
    Q: "Look at the three letters and select the one that you think is correct!",
  },
  {
    Q: "Lets begin the exercise",
  },
];

export default function SelectWord() {
  const { setDaysUnlocked } = useContext(DaysUnlockedContext);
  const { dayNumber } = useParams();
  const day = parseInt(dayNumber, 10);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false);

  const timeoutId = useRef(null);
  const intervalId = useRef(null);

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
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
    };
  }, []);

  const question = therapyQuestions[`day${day}`][currentQuestion - 1];

  const speakText = useCallback(() => {
    clearTimeout(timeoutId.current);
    clearInterval(intervalId.current);

    const speech = new SpeechSynthesisUtterance(question.Q);
    const voice = window.speechSynthesis
      .getVoices()
      .find(
        (voice) => voice.name === "Microsoft Zira - English (United States)"
      );
    if (voice) {
      speech.voice = voice;
    }
    window.speechSynthesis.speak(speech);
    console.log("Spoken initial question:", question.Q);

    let secondsElapsed = 0;

    const reminder = () => {
      if (!correctAnswerGiven) {
        const reminderSpeech = new SpeechSynthesisUtterance(
          `Hi there! It's time to answer the question: ${question.Q}`
        );
        const voice = window.speechSynthesis
          .getVoices()
          .find(
            (voice) => voice.name === "Microsoft Zira - English (United States)"
          );
        if (voice) {
          reminderSpeech.voice = voice;
        }
        window.speechSynthesis.speak(reminderSpeech);
        console.log("Spoken reminder:", question.Q);
        timeoutId.current = setTimeout(reminder, 60000);
        secondsElapsed = 0;
      }
    };

    timeoutId.current = setTimeout(reminder, 60000);
    console.log("Initial timeout set:", timeoutId.current);

    intervalId.current = setInterval(() => {
      if (!correctAnswerGiven) {
        secondsElapsed += 1;
        console.log(`Seconds elapsed: ${secondsElapsed}`);
      } else {
        clearInterval(intervalId.current);
      }
    }, 1000);
  }, [question.Q, correctAnswerGiven]);

  useEffect(() => {
    speakText();
  }, [currentQuestion, speakText]);

  const handleSelection = (isAnswerCorrect) => {
    setFeedbackMessage(isAnswerCorrect ? "CORRECT" : "TRY AGAIN!");
    if (isAnswerCorrect) {
      setIsButtonDisabled(true);
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
      setCorrectAnswerGiven(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1500);
    }

    setTimeout(() => {
      setFeedbackMessage(null);
      setCurrentQuestion((prev) => {
        const totalQuestions = therapyQuestions[`day${day}`].length;
        if (isAnswerCorrect && prev < totalQuestions) {
          setCorrectAnswerGiven(false);
          return prev + 1;
        } else if (isAnswerCorrect && prev === totalQuestions) {
          handleDayCompletion();
          return prev;
        } else {
          return prev;
        }
      });
    }, 1500);
  };

  const handleDayCompletion = () => {
    const exercise = "listening1"; // Change this based on your exercise
    setDaysUnlocked((prev) => {
      const newDaysUnlocked = { ...prev };
      newDaysUnlocked[exercise][day] = true;
      return newDaysUnlocked;
    });
    setCompleted(true);
  };

  if (completed) {
    return <Over />;
  }

  const playButton = () => {
    setIsButtonDisabled(true);
    speakText();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
  };

  return (
    <div>
      <main className="therapy">
        <h2>Listen&Select - Letter</h2>
        <h3>Select the correct Letter</h3>
        <div className="questionn">
          <p className="p1" onClick={() => handleSelection(question.Q1[1])}>
            {question.Q1[0]}
          </p>
          <p className="p2" onClick={() => handleSelection(question.Q2[1])}>
            {question.Q2[0]}
          </p>
          <p className="p3" onClick={() => handleSelection(question.Q3[1])}>
            {question.Q3[0]}
          </p>
        </div>
        <FontAwesomeIcon
          icon={faVolumeHigh}
          style={{ transform: "scale(2)", width: "5em", height: "5em" }}
          onClick={playButton}
          className={isButtonDisabled ? "play disabled" : "play"}
        />
        {feedbackMessage && (
          <p className="feedbackMessage">{feedbackMessage}</p>
        )}
        {completed && <Over />}
      </main>
    </div>
  );
}

function Over() {
  const message = "HURRAY YOU COMPLETED THE SESSION";
  const message2 = "Go Back And Start The Next SESSION";
  /*const daysPageLink =
    exercise === "listening3"
      ? "/listeningtherapy1dayspage"
      : exercise === "listening2"
      ? "/listeningtherapy2dayspage"
      : "/listeningtherapy3dayspage";*/
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className={`notification ${isVisible ? "show" : "hide"}`}>
        <p> {message}</p>
        <p>{message2}</p>
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </>
  );
}
