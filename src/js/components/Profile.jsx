var React = require('react');
var $ = require('jquery');

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



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
  _handleButton: function() {
      console.log(this.props.params.username);
    history.push(`/profiles/${this.props.params.username}/email`);
  },
  _handleButtonReview: function() {
      console.log(this.props.params.username);
    history.push(`/profiles/${this.props.params.username}/createareview`);
  },
  render: function() {
      if (!this.state.profile) {
            return <div>LOADING THE PROFILE...</div>;
        }
        var url = "/profiles/" + this.props.params.username + "/reviews";
        console.log(url);
    return (
      <div>
            <div> Name: {this.state.profile.name}</div>
            <img src={this.state.profile.profile_pic}/>
            <div> category: {this.state.profile.profileCategory} </div>
            <div> Score:  {this.state.profile.Score}</div>
            <Link to={url}>
                    <p> totalReviews: {this.state.profile.profileReviews}</p>
            </Link>
            <div> specialities: {this.state.profile.specialities} </div>
            <div> city: {this.state.profile.city} </div>
            <div> Member of onSet since: {this.state.profile.createdAt} </div>
            <button className="btn btn-danger" onClick={this._handleButtonReview}> REVIEW {this.state.profile.name} </button>
            <button className="btn btn-danger" onClick={this._handleButton}>Email me for BOOKING </button>
            
            {this.props.children}
      </div>
    );
  }
});


module.exports = Profile;