import * as React from "react";

import { ReactComponent as Sun } from "../../assets/svgs/Sun.svg";
import { ReactComponent as Moon } from "../../assets/svgs/Moon.svg";
import { ThemeContext } from "../../views";

import "./styles.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        checked={theme === "dark"}
        onChange={toggleTheme}
        type="checkbox"
        id="darkmode-toggle"
      />
      <label className="dark_mode_label" for="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
