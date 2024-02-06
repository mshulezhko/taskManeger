import Board from "@/components/Board";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <main className="">
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />
      <Modal />
    </main>
  );
}
