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
    pagination: [],
    listStyle: "smallThumbs"
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
            gifs: response.data.data
            // pagination: response.data.pagination
          });
          console.log(this.state.pagination);
        })
        .catch(err => console.log(err));

      this.setState.queryText = "";
    } else {
      alert("No empty searches ノ( º _ ºノ) ");
      return;
    }
  };

  setListStyle = e => {
    this.setState({ listStyle: e.target.name });
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
        </div>

        {this.state.gifs.length > 0 ? (
          <Gallery gifs={this.state.gifs} listStyle={this.state.listStyle} />
        ) : null}
      </div>
    );
  }
}
