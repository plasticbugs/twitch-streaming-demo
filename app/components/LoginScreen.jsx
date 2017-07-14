import React from 'react';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <a href="/auth/google">
          <div className="login-link">
            Log in with Google
          </div>
        </a>
      </div>
    )
  }
}

module.exports = LoginScreen;