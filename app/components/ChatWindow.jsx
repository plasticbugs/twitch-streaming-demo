import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingUser: null,
      userhistory: null
    }
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
    this.goBackToChat = this.goBackToChat.bind(this);
  }

  handleUsernameClick(username) {
    console.log(username);
    axios.get('/api/user-messages', { params: {
      user: username
    }})
    .then(response => {
      this.setState({
        showingUser: username,
        userhistory: response.data.messages
      })
    })
  }

  goBackToChat(e) {
    e.preventDefault();
    this.setState({showingUser: null});
  }

  render() {
    let chatwindow;
    if (this.props.video) {
      if (this.state.showingUser) {
        chatwindow = <div className="chatwindow">Showing chat history for {this.state.showingUser}<br/>
          <div className="goback"><a href="" onClick={this.goBackToChat}>Return to chat</a></div>
          { this.state.userhistory.map(item => {
            return <div className="chatmessage" key={item._id}>
              {item.msgcontent}
            </div>
          })}
        </div>
      } else {
        chatwindow = <div className="chatwindow">
          { this.props.messages.map(item => {
            return <div className="chatmessage" key={item.userstate.id}>
              <a href="" onClick={(e) => {e.preventDefault();this.handleUsernameClick(item.userstate["display-name"])}} className="username">{item.userstate["display-name"]}</a>: {item.message}
            </div>
          })}
        </div>
      }
    }
    return (
      <div>{chatwindow}</div>
    )
  }
}

module.exports = ChatWindow;