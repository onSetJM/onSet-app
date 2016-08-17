var React = require("react");
import Auth0Lock from 'auth0-lock';
//returns user's info when logged in (authenticated by Auth0)

var $ = require('jquery');

var Loggedin = React.createClass({
  logout: function() {
    this.localStorage.removeItem('id_token');
  },
  componentDidMount: function() {
    if (this.props.profile.identities[0].provider === "instagram") {
      var userObj = {
        username: this.props.profile.nickname,
        email: "" ,
        nickname: this.props.profile.name,
        profilepic: this.props.profile.picture,
        typeOfLogin: this.props.profile.identities[0].provider,
      };
    } else if (this.props.profile.identities[0].provider === "google-oauth2") {
      userObj = {
        username: this.props.profile.nickname,
        email: this.props.profile.email,
        nickname: this.props.profile.name,
        profilepic: this.props.profile.picture,
        typeOfLogin: this.props.profile.identities[0].provider.slice(0,6)
      };
    }
      console.log(userObj);
      $.ajax({           
            url: '/login', 
            data: userObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
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