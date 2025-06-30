import { SenderType } from "./senderType";

export interface ChatMessage {
  sender: SenderType;
  message: string;
}
