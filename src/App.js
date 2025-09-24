import "./App.css";
import { ColorsProvider } from "./Contexts/ColorsContext";
import ComponentContainer from "./Components/ComponentContainer";
import MenuContainer from "./Components/MenuContainer";

function App() {
  return (
    <ColorsProvider>
      <main className="app">
        <MenuContainer />
        <ComponentContainer />
      </main>
    </ColorsProvider>
  );
}

export default App;
