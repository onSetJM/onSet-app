/* global localStorage */
var React = require('react');

var Header = require("./Header");
var Footer = require("./Footer");
var Loggedin = require("./Loggedin");
import Auth0Lock from 'auth0-lock';


var App = React.createClass({
  getInitialState: function() {
    return {
      idToken: null
    };
  },
  componentWillMount: function() {
    var lock = new Auth0Lock('pQZynj9aeB6FgPoKihk7HluGGlLYwqWR', 'onset.auth0.com');
    // this.lock = new Auth0Lock('u62PeQq50xQ4RgaJr291OGnUwdgrc6cA', 'https://onsetproject-martimax21.c9users.io/');
    this.setState({
      lock: lock
    });
  },
  componentDidMount: function() {
    var that = this;
    this.state.lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getProfile() and save it to localStorage
      that.state.lock.getProfile(authResult.idToken, function(error, profile) {

        that.setState({
          profile: profile
        })

        if (error) {
          console.log(error);
          return;
        }

        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
    this.setState({
      idToken: that.getIdToken()
    })
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('id_token');
    if (!idToken) {
      localStorage.setItem('id_token', window.location.hash);
    }
    return localStorage.getItem('id_token');
  },
  render: function() {
    if (this.state.profile) {
      return (
      <div>
        <Loggedin profile={this.state.profile} lock={this.state.lock} idToken={this.state.idToken} />
        <main>
          <Header component={Header} />
          {this.props.children}
          <hr/>
          <Footer component={Footer} />
        </main>
      </div>
      );
    }
    else {
      return (
      <div>  
      <Header lock={this.state.lock} />
      <main>
        {this.props.children}
        <hr/>
        <Footer component={Footer} />
      </main>
      <hr />
      </div>
      
      );
    }
    
  }
});

module.exports = App;

