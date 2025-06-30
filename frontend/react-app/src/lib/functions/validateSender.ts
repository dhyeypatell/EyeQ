import type { SenderType } from "../../types/senderType";

export function validateSender(sender: string): SenderType {
  if (sender === "user" || sender === "ai") {
    return sender;
  }

  return "ai";
}
