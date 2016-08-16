var React = require("react");

//returns user's info when logged in (authenticated by Auth0)

var LoggedIn = React.createClass({
  render: function() {
    if (this.props.profile) {
      return (
        <div>
            <img src={this.props.profile.picture} />
            <h2>Welcome {this.props.profile.nickname}</h2>
        </div>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
});

module.exports = LoggedIn;