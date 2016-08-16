/* global localStorage */
var React = require('react');
var Home = require("./Home");
var LoggedIn = require("./LoggedIn");
import Auth0Lock from 'auth0-lock';

var Auth = React.createClass({
  getInitialState: function() {
    return {
      idToken: null
    }
  },
  componentWillMount: function() {
    var lock = new Auth0Lock('u62PeQq50xQ4RgaJr291OGnUwdgrc6cA', 'onset.auth0.com');
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

    var that = this;
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
      var userObject = {
        username: ,
        email:,
        city: "montreal",
        nickname:,
        profilepic:,
        typeOfLogin: 
      };
      return (<LoggedIn profile={this.state.profile} lock={this.state.lock} idToken={this.state.idToken} />);
    }
    else {
      return (<Home lock={this.state.lock} />);
    }
  }
});

module.exports = Auth;
