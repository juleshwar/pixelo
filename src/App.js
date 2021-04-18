import "./App.css";
import GameView from "./components/GameView";
import PaletteBar from "./components/PaletteBar";

function App() {
  return (
    <div>
      <PaletteBar
        colors={[
          "#FFFFFF",
          "#000000",
          "#9CA3AF",
          "#FBBF24",
          "#34D399",
          "#60A5FA",
          "#818CF8",
          "#EF4444",
          "#F472B6",
          "#F59E0B",
          "#059669",
        ]}
      />
      <GameView />
    </div>
  );
}

export default App;
