import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const therapyQuestions = [
  {
    Q: "APPLE",
    photoName1: ["images/apple.jpg", true],
    photoName2: ["images/orange.jpg", false],
  },
  {
    Q: "BANANA",
    photoName1: ["images/grapes.jpg", false],
    photoName2: ["images/banana.jpg", true],
  },
  {
    Q: "ORANGE",
    photoName1: ["images/banana.jpg", false],
    photoName2: ["images/orange.jpg", true],
  },
  {
    Q: "GRAPE",
    photoName1: ["images/watermelon.jpg", false],
    photoName2: ["images/grapes.jpg", true],
  },
  {
    Q: "PINEAPPLE",
    photoName1: ["images/pineapple.jpg", true],
    photoName2: ["images/mango.jpg", false],
  },
  {
    Q: "WATERMELON",
    photoName1: ["images/watermelon.jpg", true],
    photoName2: ["images/guava.jpg", false],
  },
  {
    Q: "MANGO",
    photoName1: ["images/banana.jpg", false],
    photoName2: ["images/mango.jpg", true],
  },
  {
    Q: "GUAVA",
    photoName1: ["images/guava.jpg", true],
    photoName2: ["images/pomegranate.jpg", false],
  },
  {
    Q: "PAPAYA",
    photoName1: ["images/papaya.jpg", true],
    photoName2: ["images/orange.jpg", false],
  },
  {
    Q: "POMEGRANATE",
    photoName1: ["images/apple.jpg", false],
    photoName2: ["images/pomegranate.jpg", true],
  },
];

const pageloadspeech = [
  {
    Q: "Listen and Select the Image ",
  },
  {
    Q: "Select the correct picture",
  },
];
export default function Therapy() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const speakQuestions = () => {
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
        }

        window.speechSynthesis.speak(speech);
      }
    };

    speakQuestions();

    return () => {
      // Cleanup function to stop speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);
  const handleSelection = (isAnswerCorrect) => {
    setFeedbackMessage(isAnswerCorrect ? "CORRECT" : "TRY AGAIN!");
    if (isAnswerCorrect) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1500);
    }

    setTimeout(() => {
      setFeedbackMessage(null);
      setCurrentQuestion((prev) => {
        if (isAnswerCorrect && prev <= therapyQuestions.length) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1500);
  };

  const restartPractice = () => {
    setCurrentQuestion(1);
    setFeedbackMessage(null);
  };

  /*const resetCorrectness = () => {
      setCorrect(null);
    };*/
  const question = therapyQuestions[currentQuestion - 1];

  if (currentQuestion > therapyQuestions.length) {
    return <Over onRestart={restartPractice} />;
  }
  //const questions = therapyQuestions;
  return (
    <div>
      <main className="therapy">
        <h2>Listen&Select - Image </h2>
        <h3>Select the correct picture</h3>
        <Question
          key={currentQuestion}
          question={question}
          onSelect={handleSelection}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
        />
        {feedbackMessage && (
          <p className="feedBackMessage">{feedbackMessage}</p>
        )}
      </main>
    </div>
  );
}

function Question({
  question,
  onSelect,
  isButtonDisabled,
  setIsButtonDisabled,
}) {
  //const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(question.Q);
    //speech.onstart = () => setIsSpeaking(true);
    //speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };
  const playButton = () => {
    setIsButtonDisabled(true);
    speakText();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
  };
  return (
    <>
      <div className="question">
        <img
          src={question.photoName1[0]}
          alt={question.Q}
          onClick={() => onSelect(question.photoName1[1])}
          className="firstimg"
        />
        <img
          src={question.photoName2[0]}
          alt={question.Q}
          onClick={() => onSelect(question.photoName2[1])}
          className="secondimg"
        />
      </div>
      <FontAwesomeIcon
        icon={faVolumeHigh}
        onClick={playButton}
        className={isButtonDisabled ? "play disabled" : "play"}
      />
      {/*
        <button onClick={speakText} disabled={isSpeaking} className="button">
          {isSpeaking ? (
            "Speaking..."
          ) : (
            <div>
              <FontAwesomeIcon icon={faPlay} className="play" />
            </div>
          )}
          </button> */}
    </>
  );
}
function Over({ onRestart }) {
  return (
    <>
      <p className="completed">HURRAY YOU COMPLETED THE SESSION</p>
      <button onClick={onRestart} className="onRestart">
        PRACTICE AGAIN
      </button>
    </>
  );
}
