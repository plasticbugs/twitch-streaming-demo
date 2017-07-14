import React from 'react';
import SearchResults from './SearchResults.jsx';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.clearCurrentSearch = this.clearCurrentSearch.bind(this);
  }

  handleInput(e) {
    this.setState({inputField: e.target.value}, () => {
      this.props.handleSearch(this.state.inputField);
    })

  }

  clearCurrentSearch(e, clickedChannel) {
    e.preventDefault();
    this.setState({inputField: ''});
    this.props.handleClick(clickedChannel);
  }

  render() {
    return (<div>
      <input 
        ref="channelSearch" 
        placeholder="Search for a channel" 
        onChange={this.handleInput}
        value={this.state.inputField} 
      />
      <SearchResults 
        handleChannelClick={this.clearCurrentSearch}
        results={this.props.searchResults} 
      />
    </div>);
  }
}

module.exports = ChannelSearch;