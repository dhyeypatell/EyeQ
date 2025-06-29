"use client";
import { useState } from "react";
import clsx from "clsx";
import type { ChatMessage } from "../types/chatMessage";
import Greeting from "../../components/Greeting/Greeting";
import Chatbox from "../../components/Chatbox/Chatbox";
import UserMessageBlock from "../../components/UserMessageBlock/UserMessageBlock";
import AIMessageBlock from "../../components/AIMessageBlock/AIMessageBlock";
import Styles from "./page.module.scss";

export default function Home() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  function renderMessageBlock(chatMessage: ChatMessage, index: number) {
    if (chatMessage.sender === "user") {
      return <UserMessageBlock key={index} message={chatMessage.message} />;
    } else if (chatMessage.sender === "ai") {
      return <AIMessageBlock key={index} message={chatMessage.message} />;
    }

    return null;
  }

  return (
    <div
      className={clsx(
        Styles.mainContainer,
        chatMessages.length && Styles.chatLayout
      )}
    >
      {!chatMessages.length ? (
        <Greeting />
      ) : (
        <div className={Styles.chatMessagesContainer}>
          {chatMessages.map((chatMessage, index) =>
            renderMessageBlock(chatMessage, index)
          )}
        </div>
      )}
      <Chatbox
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
