import Styles from "./UserMessageBlock.module.scss";

interface UserMessageBlockProps {
  message: string;
}

export default function UserMessageBlock({ message }: UserMessageBlockProps) {
  return (
    <div className={Styles.container}>
      <div className={Styles.block}>{message}</div>
    </div>
  );
}
