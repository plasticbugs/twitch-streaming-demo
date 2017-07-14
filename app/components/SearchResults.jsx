import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.results.map( channel => {
          return <li key={channel.name} onClick={(e) => {this.props.handleChannelClick(e, channel.name)}}><a href="">{channel.display_name}</a></li>
        })}
      </ul>
    )
    // return <div className="login"><a href="/auth/google">Log in</a></div>;
  }
}

module.exports = SearchResults;