import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.video) {
      let source = `http://player.twitch.tv/?channel=${this.props.video}`
      return (
        <iframe
          src={source}
          height="360"
          width="640"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true">
        </iframe>
      );
    } else {
      return null;
    }
  }
}

module.exports = VideoPlayer;