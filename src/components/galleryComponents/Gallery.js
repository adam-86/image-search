import React, { Component } from "react";

export default class Gallery extends Component {
  render() {
    let gallery;
    const { gifs } = this.props;
    /*
    if props contain gifs, create image block
    inside of gallery container for each one.
    */
    if (gifs) {
      gallery = (
        <div className="image-container">
          {gifs.map(gif => (
            <div
              className={`image-block transition ${this.props.listStyle}`}
              key={gif.id}
            >
              <a
                className="image-link"
                target="_blank"
                rel="noopener noreferrer"
                href={gif.url}
              >
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
