import React from 'react';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><input placeholder="Search for a channel" onInput={this.props.handleSearch} /></div>;
  }
}

module.exports = ChannelSearch;