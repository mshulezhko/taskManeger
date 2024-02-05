import Board from "@/components/Board";
import Header from "@/components/Header";

// import { resetServerContext } from "react-beautiful-dnd";
// import Header from "@/components/Header";
// import dynamic from "next/dynamic";
// // Dynamically import the Board component
// const Board = dynamic(() => import("@/components/Board"), { ssr: false });

// Reset the server context before rendering the page
// resetServerContext();

export default function Home() {
  return (
    <main className="">
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />
    </main>
  );
}
