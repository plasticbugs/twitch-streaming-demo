import React from 'react';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="login"><a href="/auth/google">Log in</a></div>;
  }
}

module.exports = LoginScreen;