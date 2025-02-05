import "./App.css";
import React, { useState } from "react";
import { ColorsProvider } from "./Contexts/ColorsContext";
import ComponentContainer from "./Components/ComponentContainer";
import Menu from "./Components/Menu";
import MobileMenu from "./Components/MobileMenu";

function App() {
  return (
    <ColorsProvider>
      <main className="app">
        <Menu />
        <MobileMenu />
        <ComponentContainer />
      </main>
    </ColorsProvider>
  );
}

export default App;
