var React = require('react');
var $ = require('jquery');
/*global localStorage */
/*global dateFormat */

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var Singlegalleryphoto = require('./Singlegalleryphoto');
var Galleryslider = require('./Galleryslider');
var Modalcreatereview = require('./Modalcreatereview');
var Email = require("./Email");
var Reviews = require("./Reviews");


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
                <div className="profilebox">
                    <div className="box profilepic">
                        <img src={this.state.profile.profile_pic}/>
                    </div>
                    <div className="box maininfo">
                        <div className="h2"> {this.state.profile.name}</div>
                        <div className="h4"> {this.state.profile.profileCategory} </div>
                        <div className="h4"> city: {this.state.profile.city} </div>
                        <div> Member of onSet since: {this.state.profile.createdAt} </div>
                    </div>
                    <div className="box buttons">
                        <Reviews profile = {this.state.profile} />
                        <Email username={this.props.params.username} name={this.state.profile.name} />
                        <Modalcreatereview name={this.state.profile.name} username={this.props.params.username} />
                    </div>
                </div>
                <div className="specialities"> 
                    <div className="h3"> Specialities: </div>
                    <p> {this.state.profile.specialities} </p>
                </div>
                <div className="gallery">
                <Galleryslider key="galleryslider" photos={this.state.photos} />
                </div>
                {this.props.children}
            </div>
    );
  }
});


module.exports = Profile;

