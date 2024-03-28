import React, { useEffect } from "react";

function Header() {
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(
      "Welcome To Aphasia Therapy Session"
    );
    window.speechSynthesis.speak(speech);

    return () => {
      // Cleanup function to stop speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <header className="header">
      <h1>Welcome To Aphasia Therapy Session</h1>
    </header>
  );
}

export default Header;
