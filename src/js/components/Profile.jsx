var React = require('react');
var $ = require('jquery');

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var Singlegalleryphoto = require('./Singlegalleryphoto');
var Galleryslider = require('./Galleryslider');


var Profile = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        console.log(this.props.params.username);
        $.ajax({           
            url: '/profile', 
            data: {username:this.props.params.username},
            type: 'POST',
            success: function(result) {
                console.log(result, "this is the result of profile AJAX");
                that.setState({
                 profile:result.profile
                });
                console.log(result.profile.token, "this is profile token");
                $.ajax({           
                 url: '/profilephotos', 
                 data: {token:result.profile.token},
                 type: 'POST',
                 success: function(result) {
                        console.log(result,"this is photo result");
                        that.setState({
                          photos:result.photos
                        });
                     },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  _handleButton: function() {
      console.log(this.props.params.username);
    history.push(`/profile/${this.props.params.username}/email`);
  },
  _handleButtonReview: function() {
      console.log(this.props.params.username);
    history.push(`/profile/${this.props.params.username}/createareview`);
  },
  render: function() {
      if (!this.state.profile) {
            return <div>LOADING THE PROFILE...</div>;
        }
      if (!this.state.photos) {
            return <div>LOADING THE PROFILE...</div>;
        }
        var url = "/profile/" + this.props.params.username + "/reviews";
        console.log(this.state, "THIS IS THE FINAL STATE");
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
            <Galleryslider key="galleryslider" photos={this.state.photos} />
            <button className="btn btn-danger" onClick={this._handleButtonReview}> REVIEW {this.state.profile.name} </button>
            <button className="btn btn-danger" onClick={this._handleButton}>Email me for BOOKING </button>
            <br/>
            <div>
            
         </div>
            
            {this.props.children}
      </div>
    );
  }
});


module.exports = Profile;
/*
<h3>Photos</h3>
            <div className="gallerydisplay">
             <ul>
                 {this.state.photos.map(function(photo){
                     return <Singlegalleryphoto key={photo.id} photo = {photo} />;
                 })}
             </ul>
            </div>
            */