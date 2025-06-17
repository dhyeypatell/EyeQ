import Greeting from "../../components/Greeting/Greeting";
import Styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={Styles.mainContainer}>
      <Greeting />
    </div>
  );
}
