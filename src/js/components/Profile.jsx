var React = require('react');
var $ = require('jquery');

var history = require('react-router').browserHistory;



var Profile = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        console.log(this.props.params.username)
        $.ajax({           
            url: '/profile', 
            data: {username:this.props.params.username},
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
  render: function() {
      if (!this.state.profile) {
            return <div>LOADING FOLLOWERS...</div>;
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
            <div> EMAIL ME FOR A BOOKING </div>
            <img src={this.state.profile.profilePic}/>
      </div>
    );
  }
});


module.exports = Profile;