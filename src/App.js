import React, { Component } from "react";

import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import SearchBar from "./components/SearchBar.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      theme: "light"
    };
  }

  changeTheme = () => {
    console.log(this.state.theme);
    if (this.state.theme === "light") {
      this.setState({ theme: "dark" });
    } else {
      this.setState({ theme: "light" });
    }
  };

  render() {
    return (
      <div className={`App ${this.state.theme}`}>
        <button
          className={`${this.state.theme}Theme`}
          onClick={this.changeTheme}
        />
        <Header />
        <SearchBar />
        <Footer />
      </div>
    );
  }
}

export default App;
