var React = require("react");
import Auth0Lock from 'auth0-lock';
//returns user's info when logged in (authenticated by Auth0)

var Loggedin = React.createClass({
  logout: function() {
    this.localStorage.removeItem('id_token');
  },
  render: function() {
    if (this.props.profile) {
      return (
        <div className="loggedinelements">
          <button onClick={this.logOut}>Log Out</button>
            <img className="loggedinimg" src={this.props.profile.picture} />
            <h4>Welcome {this.props.profile.nickname}</h4>
        </div>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
});

module.exports = Loggedin;