var React = require('react');
var $ = require('jquery');

var history = require('react-router').browserHistory;



var Createartistprofile = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        $.getJSON('/profile', function(res){
          that.setState({
                profile:res
            });
         });
  },
  render: function() {
    return (
      <div>
            <div> nickname: {this.state.profile.nickname}</div>
            <div> category: {this.state.profile.profileCategory} </div>
            <div> Score:  {this.state.profile.profileScore}</div>
            <div> totalReviews: {this.state.profile.profileReviews} </div>
            <div> specialities: {this.state.profile.profileData} </div>
            <div> city: {this.state.profile.city} </div>
            <div> Member of onSet since: {this.state.profile.createdAt} </div>
            <img src={this.state.profile.profilePic}/>
      </div>
    );
  }
});

module.exports = Createartistprofile;