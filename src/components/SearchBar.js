import React, { Component } from "react";
import axios from "axios";
import Gallery from "./galleryComponents//Gallery.js";

export default class SearchBar extends Component {
  state = {
    url: "https://api.giphy.com/v1/gifs/search?api_key=",
    key: "iNACUQW9yFvcDyaPwxNVy45mKeNNx9XP&",
    queryText: "",
    pageOffset: 0,
    resultsTotal: "",
    gifs: {},
    listStyle: "smallThumbs",
    pageNumber: "1"
  };

  onChange = e => {
    this.setState({ queryText: e.target.value });
  };

  search = () => {
    if (this.state.queryText) {
      const { url, key, queryText, pageOffset } = this.state;
      axios
        .get(
          `${url}${key}&q=${queryText}&limit=0&offset=${pageOffset}&rating=R&lang=en`
        )
        .then(response => {
          this.setState({
            gifs: response.data.data,
            resultsTotal: response.data.pagination.total_count
          });

          if (
            this.state.pageOffset === 0
              ? this.setState({ pageOffset: 25 })
              : null
          )
            console.log(this.state.resultsTotal);
        })
        .catch(err => console.log(err));

      this.setState.queryText = "";
    } else {
      alert("You didn't type anything? ノ( º – ºノ) ");
      return;
    }
  };

  setListStyle = e => {
    this.setState({ listStyle: e.target.name });
  };
  // update
  nextPage = () => {
    this.setState({
      pageOffset: this.state.pageOffset + 25,
      pageNumber: this.state.pageNumber + 1
    });
    this.search();
  };
  previousPage = () => {
    if (this.state.pageNumber > 1) {
      this.setState({
        pageOffset: this.state.pageOffset - 25,
        pageNumber: this.state.pageNumber - 1
      });
      this.search();
    }
  };

  // run search if user hits enter key
  checkKey = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  render() {
    return (
      <div>
        <div className="search-container">
          <div className="search-row">
            <div className="search-bar-container">
              <input
                type="text"
                id="search-bar"
                value={this.state.queryText}
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
              name="largeThumbs"
              onClick={this.setListStyle}
            />
            <button
              className="layout-buttons"
              name="list"
              onClick={this.setListStyle}
            />
          </div>
          <span className="display-count">
            {this.state.resultsTotal > 0
              ? `Showing  ${this.state.pageOffset}
                out of ${this.state.resultsTotal}`
              : null}
          </span>

          <div className={"nav-button-container"}>
            <button className={"nav-buttons"} onClick={this.previousPage}>
              previous page
            </button>

            <button className={"nav-buttons"} onClick={this.nextPage}>
              next page
            </button>
          </div>
        </div>
        {this.state.gifs.length > 0 ? (
          <Gallery
            gifs={this.state.gifs}
            listStyle={this.state.listStyle}
            pageOffset={this.state.pageOffset}
          />
        ) : null}
      </div>
    );
  }
}
