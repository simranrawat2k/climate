
import React, { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

function Theme() {
  const [theme, setTheme] = useState("light"); 

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="theme">
      <GoSun />
      <div className={`switch ${theme === 'dark' ? 'dark' : ''}`} onClick={handleTheme}></div>
      <IoMoonOutline />
    </div>
  );
}

export default Theme;
