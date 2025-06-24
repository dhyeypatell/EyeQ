"use client";
import { useRef, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import type { ChatboxData } from "./chatbox";
import chatboxData from "./chatbox.json";
import Styles from "./Chatbox.module.scss";
import UpArrowIcon from "../../src/assets/icons/up-arrow-circle.svg";

export default function Chatbox() {
  const chatboxDataTyped = chatboxData as ChatboxData;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [userMessage, setUserMessage] = useState<string>("");

  async function sendUserMessage(): Promise<void> {
    if (isIconDisabled()) {
      return;
    }

    const payload = {
      userMessage: userMessage.trim(),
      timeStamp: new Date().toLocaleString(chatboxDataTyped.Chatbox.locale, {
        timeZone: chatboxDataTyped.Chatbox.timezone,
      }),
    };

    try {
      const response = await fetch(chatboxDataTyped.Chatbox.fetchURLProd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          chatboxDataTyped.Chatbox.postUserResponseMainErrorMessage
        );
      }

      setUserMessage("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(
          chatboxDataTyped.Chatbox.postUserResponseUnknownErrorMessage
        );
      }
    }
  }

  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (iconRef.current?.contains(e.target as Node)) {
      textareaRef.current?.blur();
      sendUserMessage();
      return;
    }

    textareaRef.current?.focus();
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setUserMessage(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage();
    }
  }

  function isIconDisabled(): boolean {
    return !userMessage.trim().length;
  }

  return (
    <div className={Styles.container} onClick={handleContainerClick}>
      <textarea
        name={chatboxDataTyped.Chatbox.textareaName}
        placeholder={chatboxDataTyped.Chatbox.textareaPlaceholder}
        ref={textareaRef}
        className={Styles.chatInput}
        value={userMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className={Styles.iconContainer}>
        <UpArrowIcon
          ref={iconRef}
          className={clsx(Styles.icon, isIconDisabled() && Styles.disableIcon)}
        />
      </div>
    </div>
  );
}
