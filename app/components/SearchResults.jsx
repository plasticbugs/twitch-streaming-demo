import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.results)
    return (
      <ul>
        {this.props.results.map( channel => {
          return <li onClick={(e) => {this.props.handleChannelClick(e, channel.name)}}><a href="">{channel.display_name}</a></li>
        })}
      </ul>
    )
    // return <div className="login"><a href="/auth/google">Log in</a></div>;
  }
}

module.exports = SearchResults;