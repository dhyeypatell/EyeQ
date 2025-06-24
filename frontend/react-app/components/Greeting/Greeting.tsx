import greetingData from "./greeting.json";
import Styles from "./Greeting.module.scss";
import type { GreetingData } from "./greeting";

export default function Greeting() {
  const greetingDataTyped = greetingData as GreetingData;

  return (
    <div className={Styles.container}>
      <div className={Styles.mainText}>
        {greetingDataTyped.Greeting.mainText}
      </div>
      <div className={Styles.subText}>{greetingDataTyped.Greeting.subText}</div>
    </div>
  );
}
