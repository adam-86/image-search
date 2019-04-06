import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Gallery from "./galleryComponents//Gallery.js";

export default class SearchBar extends Component {
  state = {
    url: "https://api.giphy.com/v1/gifs/search?api_key=",
    key: "iNACUQW9yFvcDyaPwxNVy45mKeNNx9XP&",
    searchKeyword: "",
    pageOffset: 0,
    resultsTotal: "",
    gifs: {},
    listStyle: "smallThumbs",
    pageNumber: null,
    searchDisplay: ""
  };

  // sets search value
  onChange = e => {
    this.setState({ searchKeyword: e.target.value });
  };

  // checks if user hits enter key and calls search
  checkKey = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    // if query text exists, send http request
    if (this.state.searchKeyword) {
      // set search term for display up search bar
      this.setState({ searchDisplay: this.state.searchKeyword });
      const { url, key, searchKeyword, pageOffset } = this.state;
      axios
        .get(
          `${url}${key}&q=${searchKeyword}&limit=0&offset=${pageOffset}&rating=R&lang=en`
        )
        .then(response => {
          this.setState({
            gifs: response.data.data,
            resultsTotal: response.data.pagination.total_count
          });

          //if search has not yet ran, set initial page offset to 25
          if (
            this.state.pageOffset === 0
              ? this.setState({ pageOffset: 25, pageNumber: 1 })
              : null
          )
            console.log(this.state.resultsTotal);
        })
        .catch(err => console.log(err));

      // clear text input after search
      this.setState.searchKeyword = "";
    } else {
      alert("check your input");
      return;
    }
  };

  // set gallery grid size
  setListStyle = e => {
    const layoutButtons = document.querySelectorAll(".layout-buttons");

    //Reset class list on each button
    Array.from(layoutButtons).forEach(layoutBtn => {
      layoutBtn.className = "layout-buttons";
    });

    //set state to the name of the button clicked
    this.setState({ listStyle: e.target.name });

    // set button clicked to active
    e.target.className = "layout-buttons active";
  };

  // gets the next 25 results
  nextPage = () => {
    if (this.state.searchDisplay) {
      this.setState({
        pageOffset: this.state.pageOffset + 25,
        pageNumber: this.state.pageNumber + 1
      });
      this.search();
      this.scrollToTop();
    }
  };

  // go back to previous 25 results
  previousPage = () => {
    if (this.state.searchDisplay) {
      if (this.state.pageNumber > 1) {
        this.setState({
          pageOffset: this.state.pageOffset - 25,
          pageNumber: this.state.pageNumber - 1
        });
        this.search();
        this.scrollToTop();
      }
    }
  };
  scrollToTop = () => {
    ReactDom.findDOMNode(this).scrollIntoView({ behavior: "smooth" });
  };

  render() {
    /*
    saved page nav buttons to constant so I could easily
    display them on the above and below the search results
    */
    const pageNav = (
      <div className={"nav-button-container"}>
        <button className={"nav-buttons"} onClick={this.previousPage}>
          <i className="fas fa-angle-double-left" />
        </button>
        <span className="page-number"> Page: {this.state.pageNumber} </span>
        <button className={"nav-buttons"} onClick={this.nextPage}>
          <i className="fas fa-angle-double-right" />
        </button>
      </div>
    );

    return (
      <div>
        <div className="search-container">
          <div className="search-row">
            <div className="search-bar-container">
              <input
                type="text"
                id="search-bar"
                value={this.state.searchKeyword}
                onChange={this.onChange}
                onKeyPress={this.checkKey}
                required
              />
              <button className="search-button" onClick={this.search}>
                <i className="fas fa-search" />
              </button>
            </div>
            <button
              className="layout-buttons active"
              name="smallThumbs"
              onClick={this.setListStyle}
            />
            <button
              className="layout-buttons"
              name="mediumThumbs"
              onClick={this.setListStyle}
            />
            <button
              className="layout-buttons"
              name="largeThumbs"
              onClick={this.setListStyle}
            />
          </div>
          <span className="display-count">
            {/* only display result count if search returned results*/}
            {this.state.resultsTotal > 0
              ? `Showing  ${this.state.pageOffset}
                out of ${this.state.resultsTotal} results for "${
                  this.state.searchDisplay
                }"`
              : null}
          </span>
        </div>
        {/* If state contains gifs, render gallery */}
        {this.state.gifs.length > 0 ? (
          <div>
            {pageNav}
            <Gallery
              gifs={this.state.gifs}
              listStyle={this.state.listStyle}
              pageOffset={this.state.pageOffset}
            />
            {pageNav}
          </div>
        ) : null}
      </div>
    );
  }
}
