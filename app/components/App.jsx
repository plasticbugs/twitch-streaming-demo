import React from 'react';
import ReactDOM from 'react-dom';
import UniversalCookies from 'universal-cookie';
import axios from 'axios';
import LoggedInUser from './LoggedInUser.jsx';
import LoginScreen from './LoginScreen.jsx';
import ChannelSearch from './ChannelSearch.jsx';
// import LiveStreamVideo from './LiveStreamVideo.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import ChatWindow from './ChatWindow.jsx';
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
      if(userstate["display-name"] === null) {
        userstate["display-name"] = userstate.username;
      }
      let messagesCopy = this.state.currentMessages.slice();
      messagesCopy.push({
        userstate,
        message: message
      })
      axios.post('/api/save-message', {user: userstate["display-name"], message})
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

  handleSearch(channel) {
    axios.post('/api/stream-search', {channelname: channel})
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

  handleChannelClick(channelName) {
    this.setState({searchResults: []})
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
     cb(response.data); 
    });
  }

  render() {
    let loginlogout;
    if(this.state.currentUser) {
      loginlogout = <div>
        <LoggedInUser userinfo={this.state.currentUser}/>
        <ChannelSearch 
          handleSearch={this.handleSearch} 
          handleClick={this.handleChannelClick} 
          searchResults={this.state.searchResults}
        />
        <VideoPlayer video={this.state.selectedVideo} />
        <ChatWindow messages={this.state.currentMessages} video={this.state.selectedVideo} />
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