import data from "./Greeting.json";
import Styles from "./Greeting.module.scss";

export default function Greeting() {
  return (
    <div className={Styles.container}>
      <div className={Styles.mainText}>{data.Greeting.mainText}</div>
      <div className={Styles.subText}>{data.Greeting.subText}</div>
    </div>
  );
}
