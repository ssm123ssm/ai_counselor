import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Modal from "./components/Modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 background-gradient pt-4">
      <Header />
      <Modal />
      <ChatSection />
    </main>
  );
}
