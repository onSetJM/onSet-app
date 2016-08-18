var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var history = require('react-router').browserHistory;



var Profile = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        $.ajax({           
            url: '/profile', 
            data: {profileId:1},
            type: 'POST',
            success: function(result) {
                console.log(result);
                that.setState({
                 profile:result.profile
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  _handleClick: function(e) {
        e.preventDefault();
        history.push(`/profile/email/${this.state.profile.nickname}`);
    },
  render: function() {
      if (!this.state.profile) {
            return <div>LOADING profile...</div>;
        }
    return (
      <div>
            <div> nickname: {this.state.profile.nickname}</div>
            <div> category: {this.state.profile.profileCategory} </div>
            <div> Score:  {this.state.profile.profileScore}</div>
            <div> totalReviews: {this.state.profile.profileReviews} </div>
            <div> specialities: {this.state.profile.profileData} </div>
            <div> city: {this.state.profile.city} </div>
            <div> Member of onSet since: {this.state.profile.createdAt} </div>
            <div>  <button onClick={this._handleClick}> Email me for a booking</button> </div>
            <img src={this.state.profile.profilePic}/>
      </div>
    );
  }
});


module.exports = Profile;