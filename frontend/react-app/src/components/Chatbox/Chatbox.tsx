import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import type { ChatboxData } from "./chatbox";
import type { ChatMessage } from "../../types/chatMessage";
import { SenderType } from "../../types/senderType";
import { HttpMethod, HttpHeader, ContentType } from "../../types/http";
import { getFormattedTimestamp } from "../../lib/functions/getFormattedTimestamp";
import chatboxData from "./chatbox.json";
import Styles from "./Chatbox.module.scss";
import UpArrowIcon from "../../assets/icons/up-arrow-circle.svg";

interface ChatboxProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function Chatbox({
  userMessage,
  setUserMessage,
  chatMessages,
  setChatMessages,
}: ChatboxProps) {
  const chatboxDataTyped = chatboxData as ChatboxData;
  const chatboxRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  async function sendUserMessage(): Promise<void> {
    if (isIconDisabled()) {
      return;
    }

    const payload = {
      type: SenderType.User,
      userMessage: userMessage.trim(),
      timeStamp: getFormattedTimestamp(),
    };

    try {
      const response = await fetch(
        chatboxDataTyped.Chatbox.fetchURLUserMessagesProd,
        {
          method: HttpMethod.POST,
          headers: {
            [HttpHeader.ContentType]: ContentType.JSON,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          chatboxDataTyped.Chatbox.postUserResponseMainErrorMessage
        );
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: SenderType.User,
          message: userMessage,
        },
        {
          sender: SenderType.AI,
          message: "This is a temporary response.",
        },
      ]);

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

  useEffect(() => {
    chatboxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div
      className={Styles.container}
      ref={chatboxRef}
      onClick={handleContainerClick}
    >
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
