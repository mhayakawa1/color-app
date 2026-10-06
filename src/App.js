import "./App.css";
import { ColorsProvider } from "./Contexts/ColorsContext";
import MenuContainer from "./Components/MenuContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedColors from "./Components/SavedColors";
import ColorPicker from "./Components/ColorPicker";
import RandomPalette from "./Components/RandomPalette";
import ColorWheel from "./Components/ColorWheel";

function App() {
  return (
    <BrowserRouter>
      <ColorsProvider>
        <main className="app">
          <MenuContainer />
          <Routes>
            <Route path="/" element={<SavedColors />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/color-palettes" element={<RandomPalette />} />
            <Route path="/color-wheel" element={<ColorWheel />} />
          </Routes>
        </main>
      </ColorsProvider>
    </BrowserRouter>
  );
}

export default App;
