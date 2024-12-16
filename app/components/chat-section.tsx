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
        content:
          "Your name is SAM and you an expert counsellor.To help you with the task, I will give you some instructions as well. Then, you will be provided with a self-evaluation data sheet submitted by a medical student. You are to provide a counselling session based on the data sheet. ",
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
        content: `How to answer multiple-choice questions in medical examinations
How many questions to answer?
Research reveal that answering more questions, regardless of certainty, led to higher overall marks.
Answer &quot;don&#39;t know&quot; only for questions where one is totally uncertain.

Positive impact of reviewing and re-answering questions
Better performers tend to be more cautious and reflective.
Tag questions for review while you go through the paper and re-answer them later.

Re-answering behavior:
Benefits of reviewing and re-answering questions, aligning with existing research.
The studies recommends encouraging students, after further reflection, to change their answers in MCQ
tests, for questions where they had initial doubts. The findings challenge the belief that the first answer
that comes to mind is always the best and emphasize the importance of reconsideration in achieving
better results in high-stakes medical examinations. Changing answers, particularly from incorrect to
correct, positively impacts test scores. The results emphasize the need to educate medical students
about the value of reconsidering initial answers and challenging the misconception that the first
response is always optimal.

Efficient time management
Students tend to spent significantly more time on incorrectly answered questions.
Review your paper and understand why you spent longer time on certain questions. Is it the question
difficulty or the language proficiency? Understanding the reasons for time variations aid in better
remedial measures.

Some strategies to answer MCQs
  Do chapter by chapter, studying - topic-based manner
  Before studying go through the MCQs- Can get an idea about what to study
  Categorize past questions according to topics
  Practice MCQ papers as a whole at the end, near the exam- will sum up all that have learned

Strategies to answer essays in the exam
 Before the exams, answer past essay questions- Practice by answering more questions
  Review answered questions by a staff member to ensure accuracy
  Allocate time for Short Answer Question (SAQ) discussions
  Receive individual feedback on your particular answers
  Timing for studying and answering
  Categorize past questions according to topics
  Stop studying in detail- Do question based studying

general strategies
  Mnemonics and flashcards to memorize drug classifications and names
  Frequent use of what is learned (practice)
  Allocate a specific time for each subject daily
  Peer-based learning: arrange a discussion group (3-4 students), Divide pharmacology topics among each other, Study and teach
  Patient-centered learning: Actively learn during your clinical appointments, Go through your allocated patient drug charts, observe the indications, adverse drug reactions (ADR), drug interactions, and monitoring of drug effects
  Teacher-centered active learning: Prepare well for Small Group Discussions (SGDs), volunteer and actively participate in answering questions
  Try to focus on important points/ learning points/. Objectives of lectures
  Use active recall, mind maps, tables and charts to remember drug classes/classification
  Use short study sessions ½ hour to 1 hour
  Try a combination of techniques- e.g. Spaced repetition followed by active recall
  Attend foundation module again during free time
  Reading appropriate textbooks
  Use recommended websites to improve learning, such as watching videos


Stress
Common symptoms of stress included low moods, inability to concentrate, and loss of temper. .
The coping strategies students can use:
1. Problem-Solving: think or do something to make yourself feel happier and relaxed when
stressed. This can be seen as a problem-solving approach to cope with stress.
2. Emotional Coping: Adjusting emotions through positive thinking and self-encouragement when
faced with academic stress.
3. Active Problem Coping: This behavior involves dealing with academic stress by focusing on the
core problem and finding solutions themselves in a calm and optimistic manner.
4. Sharing Problems with Others: sharing problems with friends, which is a social support coping
strategy.
5. Meditation: meditation as a coping strategy.
6. Sleeping: sleep as a way to cope with stress.
7. Music: Listening to music
8. Support from Parents and Friends: Participants often preferred to share their problems with
parents and friends, indicating reliance on their social support networks.
9. Use of Medications: Consult medical help and take necessary medications for stress
management.
10. Recreational and Leisure Activities: Students called for more recreational and leisure activities
such as involve in games, regular time for walking, weekly movie shows, event celebrations,
excursion tours, musical concerts, sports.
1. Student Advisors/ counsellors : Approach student advisors regularly. Discuss about your study
habits, time management, self-talk, and relaxation techniques.
11. Peer support : peer groups to support counseling were suggested as solutions to cope up with
stress.
12. Stress Management Education: Involve in stress management and time management courses
which will assist in dealing with academic stress.
13. Health Education Programs: Health education programs, mentorship, and extracurricular
activities can help cope better with the demands of tertiary education.
14 Time away from studying: This will help relaxation after a period of tedious study.

`,
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
        content:
          "Now I am providing the self-evaluation data sheet. I will provide the data sheet and then you can start the counselling session directly with the student. Dont provide too much details at once. Build the conversation slowly. The student is here with me. Start chatting with the student.",
      },
    ],
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  const router = useRouter();

  const handleFinish = async () => {
    console.log("Chat finished");

    //send the messages to api/finish endpoint
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
