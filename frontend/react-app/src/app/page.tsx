import Greeting from "../../components/Greeting/Greeting";
import Chatbox from "../../components/Chatbox/Chatbox";
import Styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={Styles.mainContainer}>
      <Greeting />
      <Chatbox />
    </div>
  );
}
