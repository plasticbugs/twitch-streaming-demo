import React from 'react';
import ReactDOM from 'react-dom';
import UniversalCookies from 'universal-cookie';
import axios from 'axios';
import LoggedInUser from './LoggedInUser.jsx';
import LoginScreen from './LoginScreen.jsx';
import ChannelSearch from './ChannelSearch.jsx';

const cookies = new UniversalCookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: null
    }
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    console.log(e.target.value);
  }

  componentDidMount() {
    if (cookies.get('loggedIn') === "true") {
      this.setState({loggedIn: true});
      this.getCurrentUser( data => {
        this.setState({currentUser: data})
      })
    }
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
    console.log(this.state);
    if(this.state.currentUser) {
      loginlogout = <div><LoggedInUser userinfo={this.state.currentUser}/><ChannelSearch handleSearch={this.handleSearch} /></div>
    } else {
      loginlogout = <LoginScreen />;
    }
    return (
      <div>{loginlogout}</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'));