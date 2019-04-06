import React, { Component } from "react";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStyle: this.props.listStyle
    };
  }

  // Update state from props when grid size buttons are pressed
  componentDidRecieveProps() {
    this.setState({
      listStyle: this.props.listStyle
    });
  }

  render() {
    let gallery;
    const { gifs } = this.props;
    // if props contain gifs, create image block for each one.
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