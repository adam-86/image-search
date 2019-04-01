import React, { Component } from "react";

export default class Gallery extends Component {
  render() {
    let gallery;
    const { images } = this.props;

    if (images) {
      gallery = (
        <div className="image-container">
          {images.map(img => (
            <div className="image-block small-thumb" key={img.secret}>
              <div className="image">
                <img src={img.url_o} alt="" />
              </div>
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
