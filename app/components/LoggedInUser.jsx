import React from 'react';

class LoggedInUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><div className="userinfo">Logged in as {this.props.userinfo.displayName}</div><div className="logout"><a href="/logout">Log out</a></div></div>;
  }
}

module.exports = LoggedInUser;