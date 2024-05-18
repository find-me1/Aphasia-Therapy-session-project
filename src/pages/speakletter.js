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
import "../stylesheets/speakword.css";
import DaysUnlockedContext from "./daysunlockedcontext";
const therapyQuestions = {
  day1: [{ Q: "M" }, { Q: "R" }, { Q: "F" }, { Q: "O" }],
  day2: [
    { Q: "C" },
    { Q: "T" },
    { Q: "V" },
    { Q: "H" },
    { Q: "M" },
    { Q: "M" },
    { Q: "S" },
    { Q: "C" },
    { Q: "U" },
    { Q: "M" },
  ],
  day3: [
    { Q: "P" },
    { Q: "S" },
    { Q: "K" },
    { Q: "M" },
    { Q: "G" },
    { Q: "C" },
    { Q: "A" },
    { Q: "N" },
    { Q: "C" },
    { Q: "U" },
  ],
};

const pageloadspeech = [
  { Q: "Listen to the question and repeat it aloud." },
  { Q: "Click the play button to hear the question again." },
];

export default function SpeechRecognitionComponent() {
  const { setDaysUnlocked } = useContext(DaysUnlockedContext);
  const { dayNumber } = useParams();
  const day = parseInt(dayNumber, 10);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctAnswerGiven] = useState(false);
  const [spokenWord, setSpokenWord] = useState("");

  const timeoutId = useRef(null);
  const intervalId = useRef(null);

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
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
    };
  }, []);
  //const question = therapyQuestions[`day${day}`][currentQuestion - 1];
  const speakText = useCallback(
    (question) => {
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
              (voice) =>
                voice.name === "Microsoft Zira - English (United States)"
            );
          if (voice) {
            reminderSpeech.voice = voice;
          }
          window.speechSynthesis.speak(reminderSpeech);
          console.log("Spoken reminder:", question.Q);
          timeoutId.current = setTimeout(reminder, 1000000);
          secondsElapsed = 0;
        }
      };

      timeoutId.current = setTimeout(reminder, 1000000);
      console.log("Initial timeout set:", timeoutId.current);

      intervalId.current = setInterval(() => {
        if (!correctAnswerGiven) {
          secondsElapsed += 1;
          console.log(`Seconds elapsed: ${secondsElapsed}`);
        } else {
          clearInterval(intervalId.current);
        }
      }, 1000);
      setSpokenWord("");
    },
    [correctAnswerGiven]
  );

  useEffect(() => {
    speakText(therapyQuestions[`day${day}`][currentQuestion - 1]);
  }, [currentQuestion, day, speakText]);

  const handleSpeechRecognition = (question) => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript
          .trim()
          .toUpperCase()
          .replace(/\./g, "");
        setSpokenWord(spokenText);
        checkAnswer(spokenText, question);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } catch (error) {
      console.error("Speech recognition error:", error);
    }
  };

  const checkAnswer = (spokenText, question) => {
    const correctAnswer = question.Q;
    const isAnswerCorrect = spokenText === correctAnswer;
    setFeedbackMessage(isAnswerCorrect ? "CORRECT" : "TRY AGAIN!");
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
      setFeedbackMessage(null);
      if (isAnswerCorrect) {
        if (currentQuestion === therapyQuestions[`day${day}`].length) {
          handleDayCompletion();
        } else {
          setCurrentQuestion((prev) => prev + 1);
        }
      }
    }, 1500);
  };

  const playButton = () => {
    setIsButtonDisabled(true);
    speakText(therapyQuestions[`day${day}`][currentQuestion - 1]);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
  };
  if (completed) {
    return <Over />;
  }
  const handleDayCompletion = () => {
    const exercise = "speaking1";
    setDaysUnlocked((prev) => {
      const newDaysUnlocked = { ...prev };
      newDaysUnlocked[exercise][day] = true;
      return newDaysUnlocked;
    });
    setCompleted(true);
  };
  return (
    <div>
      <main className="therapy">
        <h2>Listen & Repeat - Letters</h2>
        <h3>Repeat the Letter</h3>
        <div className="question">
          <p className="p1">
            {therapyQuestions[`day${day}`][currentQuestion - 1].Q}
          </p>
          <button
            onClick={() =>
              handleSpeechRecognition(
                therapyQuestions[`day${day}`][currentQuestion - 1]
              )
            }
            className={isButtonDisabled ? "hi disable" : "hi"}
          >
            Start Speech Recognition
          </button>
          <p className="hi1">Spoken Word: {spokenWord}</p>
          <FontAwesomeIcon
            icon={faVolumeHigh}
            style={{ transform: "scale(2)", width: "5em", height: "5em" }}
            onClick={playButton}
            className={isButtonDisabled ? "play disabled" : "play"}
          />
        </div>
        {feedbackMessage && (
          <p className="feedBackMessage">{feedbackMessage}</p>
        )}

        {completed && <Over />}
      </main>
    </div>
  );
}

function Over() {
  const message = "HURRAY YOU COMPLETED THE SESSION";
  const message2 = "Go Back And Start The Next SESSION";
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className={`notification ${isVisible ? "show" : "hide"}`}>
        <p>{message}</p>
        <p>{message2}</p>
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </>
  );
}
