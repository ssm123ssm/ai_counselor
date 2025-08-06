"use client";

import { useChat } from "ai/react";
import { useMemo } from "react";
import { insertDataIntoMessages } from "./transform";
import { ChatInput, ChatMessages } from "./ui/chat";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ChatSection() {
  const [chatInitiated, setChatInitiated] = useState(false);

  const response = await fetch(process.env.NEXT_PUBLIC_INSTRUCTIONS_API);
  const instructions = await response.text();

  const data_sheet = await fetch(process.env.NEXT_PUBLIC_INSTRUCTIONS_API);
  const instructions_dat = await data_sheet.text();

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    initialMessages: [
      {
        id: "cm1",
        role: "user",
        content: process.env.init,
      },
      {
        id: "cm1",
        role: "system",
        content:
          "Understood. I am SAM and a counsellor. Please provide the instructions.",
      },
      {
        id: "cm1",
        role: "user",
        content: instructions,
      },
      {
        id: "cm1",
        role: "system",
        content:
          "Understood. Please provide the self-evaluation data sheet. Once you provide the data sheet, I will start the counselling session in a conversational manner. ",
      },
      {
        id: "cm1",
        role: "user",
        content: instructions_dat,
      },
    ],
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  const router = useRouter();

  const handleFinish = async () => {
    console.log("Chat finished");

    const res = await fetch("/api/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: transformedMessages }),
    });

    window.open("https://forms.office.com/r/SBJwgK3t8e", "_ blank");
    location.reload();
  };

  return (
    <div className="space-y-4 max-w-5xl w-full mt-[30px] mb-[120px] flex items-center flex-col">
      <ChatMessages
        messages={transformedMessages.slice(5)}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
      />
      <Button
        size="lg"
        className="w-[30px] bg-gradient-to-r from-sky-500 to-sky-700 text-white mb-5"
        onClick={handleFinish}
      >
        Finish
      </Button>
    </div>
  );
}
