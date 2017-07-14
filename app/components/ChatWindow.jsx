import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingUser: false,
      userhistory: null
    }
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
  }

  handleUsernameClick(username) {
    console.log(username);
    this.setState({showingUser: true}, () => {
      axios.get('/api/user-messages', { params: {
        user: username
      }})
      .then(response => {
        this.setState({userhistory: response.data.messages})
      })
    })
  }

  render() {
    let chatwindow;
    if (this.props.video) {
      chatwindow = <div className="chatwindow">
        { this.props.messages.map(item => {
          return <div className="chatmessage" key={item.userstate.id}>
            <a href="" onClick={(e) => {e.preventDefault();this.handleUsernameClick(item.userstate["display-name"])}} className="username">{item.userstate["display-name"]}</a>: {item.message}
          </div>
        })}
      </div>
    }
    return (
      <div>{chatwindow}</div>
    )
  }
}

module.exports = ChatWindow;