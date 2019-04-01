import React, { Component } from "react";
import axios from "axios";
import Gallery from "./galleryComponents//Gallery.js";

export default class SearchBar extends Component {
  state = {
    queryText: "random",
    url:
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=",
    key: "c1a68f5a5fd40781be6fb8640d404ffa",
    secret: "cdb0ca44a9a68a5e",
    resultsPerPage: 30,
    images: {}
  };

  onChange = e => {
    this.setState({ queryText: e.target.value });
    console.log(this.state.queryText);
  };

  search = () => {
    console.log("search pressed");
    const { url, key, queryText, resultsPerPage } = this.state;
    axios
      .get(
        `${url}${key}&per_page=${resultsPerPage}&format=json&nojsoncallback=1&text=${queryText}&extras=url_o`
      )
      .then(response => {
        this.setState({ images: response.data.photos.photo });
        console.log(this.state.images);
      })
      .catch(err => console.log(err));

    this.state.queryText = "";
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
              />
            </div>

            <button className="layout-buttons active" />
            <button className="layout-buttons" />
            <button className="layout-buttons" />
            <button onClick={this.search}>Search</button>
          </div>
        </div>
        {this.state.images.length > 0 ? (
          <Gallery images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
