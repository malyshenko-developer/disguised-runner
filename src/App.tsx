import { GameCanvas } from "./components/GameCanvas.tsx";

function App() {
  return (
    <main
      className={
        "w-screen h-screen bg-gradient-to-br from-[#111b24] via-[#1a2336] to-[#070e17] flex justify-center items-center"
      }
    >
      <GameCanvas />
    </main>
  );
}

export default App;
