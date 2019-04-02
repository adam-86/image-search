import React, { Component } from "react";
import axios from "axios";
import Gallery from "./galleryComponents//Gallery.js";

export default class SearchBar extends Component {
  state = {
    url: "https://api.giphy.com/v1/gifs/search?api_key=",
    key: "iNACUQW9yFvcDyaPwxNVy45mKeNNx9XP&",
    queryText: "",
    resultsPerPage: 100,
    gifs: {},
    pagination: []
  };

  onChange = e => {
    this.setState({ queryText: e.target.value });
  };

  checkKey = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    if (this.state.queryText) {
      const { url, key, queryText, resultsPerPage } = this.state;
      axios
        .get(
          `${url}${key}&q=${queryText}&limit=${resultsPerPage}&offset=0&rating=R&lang=en`
        )
        .then(response => {
          this.setState({
            gifs: response.data.data,
            pagination: response.data.pagination
          });
          console.log(this.state.pagination);
        })
        .catch(err => console.log(err));

      this.setState.queryText = "";
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <div className="search-container">
          <div className="search-row">
            <div className="search-bar-container">
              <i className="fas fa-search" />
              <input
                type="text"
                id="search-bar"
                value={this.state.queryText}
                onChange={this.onChange}
                onKeyPress={this.checkKey}
              />
              <button className="search-button" onClick={this.search}>
                Search
              </button>
            </div>
            <button className="layout-buttons active" />
            <button className="layout-buttons" />
            <button className="layout-buttons" />
          </div>
        </div>

        {this.state.gifs.length > 0 ? <Gallery gifs={this.state.gifs} /> : null}
      </div>
    );
  }
}
