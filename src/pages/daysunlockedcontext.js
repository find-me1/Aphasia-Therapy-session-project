import React, { createContext, useState, useEffect } from "react";

const DaysUnlockedContext = createContext();

export const DaysUnlockedProvider = ({ children }) => {
  const initialDaysUnlocked = {
    listening1:
      JSON.parse(localStorage.getItem("listening1DaysUnlocked")) ||
      Array(10).fill(false),
    listening2:
      JSON.parse(localStorage.getItem("listening2DaysUnlocked")) ||
      Array(10).fill(false),
    listening3:
      JSON.parse(localStorage.getItem("listening3DaysUnlocked")) ||
      Array(10).fill(false),
    speaking1:
      JSON.parse(localStorage.getItem("speaking1DaysUnlocked")) ||
      Array(10).fill(false),
    speaking2:
      JSON.parse(localStorage.getItem("speaking2DaysUnlocked")) ||
      Array(10).fill(false),
    speaking3:
      JSON.parse(localStorage.getItem("speaking3DaysUnlocked")) ||
      Array(10).fill(false),
  };

  initialDaysUnlocked.listening1[0] = true;
  initialDaysUnlocked.listening2[0] = true;
  initialDaysUnlocked.listening3[0] = true;
  initialDaysUnlocked.speaking1[0] = true;
  initialDaysUnlocked.speaking2[0] = true;
  initialDaysUnlocked.speaking3[0] = true;

  const [daysUnlocked, setDaysUnlocked] = useState(initialDaysUnlocked);

  useEffect(() => {
    localStorage.setItem(
      "listening1DaysUnlocked",
      JSON.stringify(daysUnlocked.listening1)
    );
    localStorage.setItem(
      "listening2DaysUnlocked",
      JSON.stringify(daysUnlocked.listening2)
    );
    localStorage.setItem(
      "listening3DaysUnlocked",
      JSON.stringify(daysUnlocked.listening3)
    );
    localStorage.setItem(
      "speaking1DaysUnlocked",
      JSON.stringify(daysUnlocked.speaking1)
    );
    localStorage.setItem(
      "speaking2DaysUnlocked",
      JSON.stringify(daysUnlocked.speaking2)
    );
    localStorage.setItem(
      "speaking3DaysUnlocked",
      JSON.stringify(daysUnlocked.speaking3)
    );
  }, [daysUnlocked]);

  return (
    <DaysUnlockedContext.Provider value={{ daysUnlocked, setDaysUnlocked }}>
      {children}
    </DaysUnlockedContext.Provider>
  );
};

export default DaysUnlockedContext;
