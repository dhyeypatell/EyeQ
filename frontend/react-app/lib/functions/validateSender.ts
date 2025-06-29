import type { SenderType } from "../../src/types/senderType";

export function validateSender(sender: string): SenderType {
  if (sender === "user" || sender === "ai") {
    return sender;
  }

  return "ai";
}
