"use client";

import ChatAvatar from "./chat-avatar";
import { Message } from "./chat-messages";
import Markdown from "react-markdown";

export default function ChatItem(message: Message) {
  return (
    <div className="flex items-start gap-4 pt-5">
      <ChatAvatar {...message} />
      <p className="break-words">{<Markdown>{message.content}</Markdown>}</p>
    </div>
  );
}
