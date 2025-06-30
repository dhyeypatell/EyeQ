import Styles from "./AIMessageBlock.module.scss";

interface UserMessageBlockProps {
  message: string;
}

export default function AIMessageBlock({ message }: UserMessageBlockProps) {
  return <div className={Styles.container}>{message}</div>;
}
