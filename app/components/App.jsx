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
import client from '../helpers/twitchHelper.js'

const cookies = new UniversalCookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: null,
      searchResults: [],
      selectedVideo: null,
      currentMessages: []
    }
    client.on("message", (channel, userstate, message, self) => {
  // post username and their message to the server
      console.log(userstate);
      let messagesCopy = this.state.currentMessages.slice();
      messagesCopy.push({
        userstate,
        message: message
      })
      axios.post('/api/save-message', {user: userstate.username, message})
      .then(success => {
        this.setState({currentMessages: messagesCopy});
      })
      .catch(error => {
        console.log("Error saving to DB: ", error);
      })
    });

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChannelClick = this.handleChannelClick.bind(this);
    this.connectToChat = this.connectToChat.bind(this);
  }

  handleSearch(e) {
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

  connectToChat(channel) {
    this.setState({currentMessages: []}, () => {
      client.join(channel)
    })
  }

  handleChannelClick(e, channelName) {
    e.preventDefault();
    if(this.state.selectedVideo) {
      client.part(this.state.selectedVideo);
    }
    this.setState({selectedVideo: channelName}, () => {
      console.log(this.state.selectedVideo)
      this.connectToChat(channelName)
    });
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
        { this.state.currentMessages.map(item => {
          return <div key={item.userstate.id}>{item.userstate["display-name"]}{item.message}</div>
        })}
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