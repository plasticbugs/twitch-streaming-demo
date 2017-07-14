import React from 'react';
import ReactDOM from 'react-dom';
import UniversalCookies from 'universal-cookie';
import axios from 'axios';
import LoggedInUser from './LoggedInUser.jsx';
import LoginScreen from './LoginScreen.jsx';
import ChannelSearch from './ChannelSearch.jsx';
// import LiveStreamVideo from './LiveStreamVideo.jsx';
import SearchResults from './SearchResults.jsx';
import VideoPlayer from './VideoPlayer.jsx';

const cookies = new UniversalCookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: null,
      searchResults: [],
      selectedVideo: null
    }
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChannelClick = this.handleChannelClick.bind(this);
  }

  handleSearch(e) {
    console.log(e.target.value);
    axios.post('/api/stream-search', {channelname: e.target.value})
    .then(response => {
      this.setState({searchResults: response.data.channels});
    })
  }

  componentDidMount() {
    if (cookies.get('loggedIn') === "true") {
      this.setState({loggedIn: true});
      this.getCurrentUser( data => {
        this.setState({currentUser: data})
      })
    }
  }

  handleChannelClick(e, channelName) {
    e.preventDefault();
    this.setState({selectedVideo: channelName});
  }

  getCurrentUser(cb) {
    axios.get('/api/getCurrentUser')
    .then(response => {
      console.log(response.data);
     cb(response.data); 
    });
  }

  render() {
    let loginlogout;
    
    if(this.state.currentUser) {
      loginlogout = <div>
        <LoggedInUser userinfo={this.state.currentUser}/>
        <ChannelSearch handleSearch={this.handleSearch} />
        <SearchResults handleChannelClick={this.handleChannelClick} results={this.state.searchResults} />
        <VideoPlayer video={this.state.selectedVideo} />
        </div>
    } else {
      loginlogout = <LoginScreen />;
    }
    return (
      <div>{loginlogout}</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'));