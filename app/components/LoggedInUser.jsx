import React from 'react';

class LoggedInUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Logged in as {this.props.userinfo.displayName}<br/><a href="/logout">Log out</a></div>;
  }
}

module.exports = LoggedInUser;