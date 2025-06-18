import data from "./Chatbox.json";
import Styles from "./Chatbox.module.scss";

export default function Chatbox() {
  return (
    <textarea
      name="prompt"
      placeholder={data.Chatbox.placeholder}
      className={Styles.chatInput}
    />
  );
}
