import React, { Component } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import SearchBar from "./components/SearchBar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
        <Footer />
      </div>
    );
  }
}

export default App;
