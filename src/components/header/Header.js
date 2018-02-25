import React, { Component } from "react";
import swedishFlagLight from "../../assets/icons/dark/swedish.svg";
import swedishFlagDark from "../../assets/icons/dark/swedish.svg";
import englishFlagLight from "../../assets/icons/light/english.svg";
import englishFlagDark from "../../assets/icons/light/english.svg";
import darkThemeIcon from "../../assets/icons/light/night-mode.svg";
import lightThemeIcon from "../../assets/icons/dark/night-mode.svg";
import lightLogo from "../../assets/icons/light/fingerprint-logo.svg";
import darkLogo from "../../assets/icons/dark/fingerprint-logo.svg";
import "./Header.css";

export class Header extends Component {
  getLogo = () => {
    if (this.props.theme === "light") {
      return lightLogo;
    }
    return darkLogo;
  };
  getThemeIcon = () => {
    if (this.props.theme === "light") {
      return darkThemeIcon;
    }
    return lightThemeIcon;
  };
  getLanguageIcon = () => {
    if (this.props.language === "english") {
      if (this.props.theme === "light") {
        return swedishFlagLight;
      } else {
        return swedishFlagDark;
      }
    } else {
      if (this.props.theme === "light") {
        return englishFlagLight;
      } else {
        return englishFlagDark;
      }
    }
  };
  onLanguageChange = () => {
    if (this.props.language === "swedish") {
      this.props.onLanguageChange("english");
    } else {
      this.props.onLanguageChange("swedish");
    }
  };
  onThemeChange = () => {
    if (this.props.theme === "light") {
      this.props.onThemeChange("dark");
    } else {
      this.props.onThemeChange("light");
    }
  };
  render() {
    return (
      <div className="header">
        <img
          width={25}
          height={25}
          alt="language-selection"
          src={this.getLogo()}
        />
        CRIMEVIS
        <img
          onClick={this.onLanguageChange}
          width={25}
          height={25}
          alt="language-selection"
          src={this.getLanguageIcon()}
        />
        <img
          onClick={this.onThemeChange}
          width={25}
          height={25}
          alt="theme-selection"
          src={this.getThemeIcon()}
        />
      </div>
    );
  }
}
