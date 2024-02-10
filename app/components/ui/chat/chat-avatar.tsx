"use client";

import Image from "next/image";
import { Message } from "./chat-messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faU, faUser } from "@fortawesome/free-solid-svg-icons";

export default function ChatAvatar(message: Message) {
  if (message.role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border  bg-white text-gray-500">
        <FontAwesomeIcon icon={faUser} />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border  bg-white text-gray-500">
      <FontAwesomeIcon icon={faComputer} />
    </div>
  );
}
