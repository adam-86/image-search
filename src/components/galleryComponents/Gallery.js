import React, { Component } from "react";

export default class Gallery extends Component {
  render() {
    let gallery;
    const { gifs } = this.props;

    if (gifs) {
      gallery = (
        <div className="image-container">
          {gifs.map(gif => (
            <div className="image-block small-thumb" key={gif.id}>
              <a className="image-link" target="_blank" href={gif.url}>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${gif.images.original.url})` }}
                />
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      gallery = "";
    }
    return <div>{gallery}</div>;
  }
}
