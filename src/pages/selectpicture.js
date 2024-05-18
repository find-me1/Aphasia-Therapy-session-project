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
import "../stylesheets/selectpicture.css";
import DaysUnlockedContext from "./daysunlockedcontext";

const therapyQuestions = {
  day1: [
    {
      Q: "APPLE",
      photoName1: [`${process.env.PUBLIC_URL}/images/apple.jpg`, true],
      photoName2: [`${process.env.PUBLIC_URL}/images/orange.jpg`, false],
    },
    {
      Q: "BANANA",
      photoName1: [`${process.env.PUBLIC_URL}/images/grapes.jpg`, false],
      photoName2: [`${process.env.PUBLIC_URL}/images/banana.jpg`, true],
    },
    {
      Q: "ORANGE",
      photoName1: [`${process.env.PUBLIC_URL}/images/banana.jpg`, false],
      photoName2: [`${process.env.PUBLIC_URL}/images/orange.jpg`, true],
    },
    {
      Q: "GRAPE",
      photoName1: [`${process.env.PUBLIC_URL}/images/watermelon.jpg`, false],
      photoName2: [`${process.env.PUBLIC_URL}/images/grapes.jpg`, true],
    },
    {
      Q: "PINEAPPLE",
      photoName1: [`${process.env.PUBLIC_URL}/images/pineapple.jpg`, true],
      photoName2: [`${process.env.PUBLIC_URL}/images/mango.jpg`, false],
    },
  ],
  day2: [
    {
      Q: "WATERMELON",
      photoName1: [`${process.env.PUBLIC_URL}/images/watermelon.jpg`, true],
      photoName2: [`${process.env.PUBLIC_URL}/images/guava.jpg`, false],
    },
    {
      Q: "MANGO",
      photoName1: [`${process.env.PUBLIC_URL}/images/banana.jpg`, false],
      photoName2: [`${process.env.PUBLIC_URL}/images/mango.jpg`, true],
    },
    {
      Q: "GUAVA",
      photoName1: [`${process.env.PUBLIC_URL}/images/guava.jpg`, true],
      photoName2: [`${process.env.PUBLIC_URL}/images/pomegranate.jpg`, false],
    },
    {
      Q: "PAPAYA",
      photoName1: [`${process.env.PUBLIC_URL}/images/papaya.jpg`, true],
      photoName2: [`${process.env.PUBLIC_URL}/images/orange.jpg`, false],
    },
    {
      Q: "POMEGRANATE",
      photoName1: [`${process.env.PUBLIC_URL}/images/apple.jpg`, false],
      photoName2: [`${process.env.PUBLIC_URL}/images/pomegranate.jpg`, true],
    },
  ],
};

const pageloadspeech = [
  {
    Q: "Click on the play button to listen to the Question.",
  },
  {
    Q: "Look at the two images and select the one that you think is correct!",
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
    const exercise = "listening1";
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
        <h2>Listen&Select - Picture</h2>
        <h3>Select the correct Picture</h3>
        <div className="questionn">
          <img
            src={question.photoName1[0]}
            alt={question.Q}
            onClick={() => handleSelection(question.photoName1[1])}
            className="firstimg"
          />
          <img
            src={question.photoName2[0]}
            alt={question.Q}
            onClick={() => handleSelection(question.photoName2[1])}
            className="secondimg"
          />
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
