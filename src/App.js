import React, { Component } from "react";

import "./App.css";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar.js";
// import Gallery from "./components/Gallery.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
      </div>
    );
  }
}

export default App;
