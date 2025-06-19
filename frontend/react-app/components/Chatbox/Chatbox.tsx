"use client";
import data from "./Chatbox.json";
import Styles from "./Chatbox.module.scss";
import UpArrowIcon from "../../src/assets/icons/up-arrow-circle.svg";
import { useRef, useState } from "react";

export default function Chatbox() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [userMessage, setUserMessage] = useState("");

  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (iconRef.current?.contains(e.target as Node)) {
      textareaRef.current?.blur();
      return;
    }

    textareaRef.current?.focus();
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserMessage(e.target.value);
  }

  return (
    <div className={Styles.container} onClick={handleContainerClick}>
      <textarea
        name="prompt"
        placeholder={data.Chatbox.placeholder}
        ref={textareaRef}
        className={Styles.chatInput}
        value={userMessage}
        onChange={handleChange}
      />
      <div className={Styles.iconContainer}>
        <UpArrowIcon ref={iconRef} className={Styles.icon} />
      </div>
    </div>
  );
}
