"use client";
import data from "./Chatbox.json";
import Styles from "./Chatbox.module.scss";
import UpArrowIcon from "../../src/assets/icons/up-arrow-circle.svg";
import { useState } from "react";

export default function Chatbox() {
  const [userMessage, setUserMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserMessage(e.target.value);
  }

  return (
    <div className={Styles.container}>
      <textarea
        name="prompt"
        placeholder={data.Chatbox.placeholder}
        className={Styles.chatInput}
        value={userMessage}
        onChange={handleChange}
      />
      <div className={Styles.iconContainer}>
        <UpArrowIcon className={Styles.icon} />
      </div>
    </div>
  );
}
