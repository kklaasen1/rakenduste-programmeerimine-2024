import React, { useState } from "react"
import './App.css';
import Name from "./components/Name.js";
import Counter from './components/Counter.js';
import PropDrilling from "./components/PropDrilling"
import Show from "./components/Show"
import Context from "./components/Context"
import ShoppingList from "./components/ShoppingList.js"
import User from "./components/User.js"
import Profile from './components/Profile';

function App() {
  const [show, setShow] = useState(true)

  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <Context />
      <Show
        show={show}
        toggleShow={toggleShow}
      />
      <PropDrilling />
      <Counter/>
      <Name title="Karmen" />
      <Name />
      <ShoppingList/>
      <User/>
      <Profile name="Karmen" />
    </>
  )
}

export default App;
