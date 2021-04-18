import "./App.css";
import PaletteBar from "./components/PaletteBar";

function App() {
    return (
        <div className="App">
            <PaletteBar
                colors={[
                    "#FFFFFF",
                    "#000000",
                    "#9CA3AF",
                    "#FBBF24",
                    "#34D399",
                    "#60A5FA",
                    "#818CF8",
                    "#A78BFA",
                    "#F472B6",
                ]}
            />
        </div>
    );
}

export default App;
