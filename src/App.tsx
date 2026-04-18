import {GameCanvas} from "./components/GameCanvas.tsx";

function App() {
  return (
      <main className={
          "w-screen h-screen bg-gradient-to-br from-[#87CEEB] via-[#5A9BD4] to-[#4682B4] flex justify-center items-center"
      }>
        <GameCanvas />
    </main>
  )
}

export default App
