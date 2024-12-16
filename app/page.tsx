import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Modal from "./components/Modal";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center p-4 background-gradient">
      <Header />
      <Modal />
      <ChatSection />
    </main>
  );
}
