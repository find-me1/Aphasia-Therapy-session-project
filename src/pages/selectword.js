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
    {
      Q: "APPLE",
      Q1: ["APPLE", false],
      Q2: ["MAN", true],
      Q3: ["CARROT", false],
    },
    {
      Q: "ORANGE",
      Q1: ["JUICE", false],
      Q2: ["ORANGE", true],
      Q3: ["STRAWBERRY", false],
    },
    {
      Q: "MANGO",
      Q1: ["APPLE", false],
      Q2: ["BANANA", false],
      Q3: ["MANGO", true],
    },
    {
      Q: "WATERMELON",
      Q1: ["GRAPES", false],
      Q2: ["APPLE", false],
      Q3: ["WATERMELON", true],
    },
    {
      Q: "PAPAYA",
      Q1: ["PINEAPPLE", false],
      Q2: ["PAPAYA", true],
      Q3: ["BANANA", false],
    },
  ],
  day2: [
    {
      Q: "DEER",
      Q1: ["ELEPHANT", false],
      Q2: ["DEER", true],
      Q3: ["INDIA", false],
    },
    {
      Q: "RAINBOW",
      Q1: ["VIOLET", false],
      Q2: ["GREEN", false],
      Q3: ["RAINBOW", true],
    },
    {
      Q: "DOOR",
      Q1: ["TOMMOROW", false],
      Q2: ["DOOR", true],
      Q3: ["DONKEY", false],
    },
    {
      Q: "TODAY",
      Q1: ["MONDAY", false],
      Q2: ["FISH", false],
      Q3: ["TODAY", true],
    },
    {
      Q: "SUPER",
      Q1: ["AMAZING", false],
      Q2: ["SUPER", true],
      Q3: ["LOVE", false],
    },
    {
      Q: "SODA",
      Q1: ["LEMON", false],
      Q2: ["TASTE", false],
      Q3: ["SODA", true],
    },
  ],
  day3: [
    {
      Q: "DOOR",
      Q1: ["ROAR", false],
      Q2: ["TOOR", false],
      Q3: ["DOOR", true],
    },
    {
      Q: "SWEET",
      Q1: ["TASTE", false],
      Q2: ["SWEET", true],
      Q3: ["SUGAR", false],
    },
    {
      Q: "SOAP",
      Q1: ["SOAP", true],
      Q2: ["GASP", false],
      Q3: ["SOOP", false],
    },
    {
      Q: "BEST",
      Q1: ["BETTER", false],
      Q2: ["BEST", true],
      Q3: ["CHEST", false],
    },
    {
      Q: "SNOW",
      Q1: ["SNOW", true],
      Q2: ["KNOW", false],
      Q3: ["OWN", false],
    },
    {
      Q: "LUNCH",
      Q1: ["CRUNCH", false],
      Q2: ["MUNCH", false],
      Q3: ["LUNCH", true],
    },
  ],
};

const pageloadspeech = [
  {
    Q: "Click on the play button to listen to the Question.",
  },
  {
    Q: "Look at the three words and select the one that you think is correct!",
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
    const exercise = "listening2";
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
    // Additional logic if needed when closing the notification
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
