var React = require('react');
var $ = require('jquery');
/*global localStorage */
/*global dateFormat */
import {ButtonToolbar, Button} from 'react-bootstrap';

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var HeaderOther = require("./HeaderOther");
var Singlegalleryphoto = require('./Singlegalleryphoto');
var Galleryslider = require('./Galleryslider');
var Createreviewmodal = require('./Createreviewmodal');
var Email = require("./Email");
var Reviews = require("./Reviews");
var StarRatingComponent = require('react-star-rating-component');
var moment = require('moment');
var Reviewsmodaldisplay = require('./Reviewsmodaldisplay');


var Profile = React.createClass({
    getInitialState: function() {
        return {
            reviews: []
        };
    },
    fetchData: function() {
        var that = this;
        console.log(this.props.params.username);
        $.ajax({           
            url: '/profile', 
            data: {username:this.props.params.username},
            type: 'POST',
            success: function(result) {
                console.log(result, "this is the result of profile AJAX");
                that._fetchReviews(result.profile);
                that.setState({
                 profile: result.profile
                });
                console.log(result.profile, "this is profile token");
                $.ajax({           
                 url: '/profilephotos', 
                 data: {token: result.profile.token},
                 type: 'POST',
                 success: function(result) {
                        // console.log(result,"this is photo result");
                        that.setState({
                          photos: result.photos
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
  _fetchReviews: function(profile) {
      var that = this;
       $.ajax({           
            url: '/reviews', 
            data: {profileusername: profile.username},
            type: 'POST',
            success: function(result) {
                console.log(result.reviews, "this is the review object");
                that.setState({
                 reviews:result.reviews
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  componentDidMount:function(){
      this.fetchData();
  },
  componentDidUpdate: function(prevProps) {
      if (prevProps.params.username !== this.props.params.username) {
          this.fetchData();
      }
  },
  _reviewSubmitted:function(){
      this.fetchData();
  },
  _handleButton: function() {
     console.log(this.props.params.username);
    history.push(`/profile/${this.props.params.username}/email`);
  },
  _onEditProfileClick: function() {
      history.push(`/editprofile/${this.props.params.username}`);
  },
  render: function() {
      if (!this.state.profile) {
            return <div>Loading...</div>;
        }
      if (!this.state.photos) {
            return <div>Loading...</div>;
        }
        var url = "/profile/" + this.props.params.username + "/reviews";
        console.log(this.state, "THIS IS THE FINAL STATE");
        var score = (this.state.profile.profileScore)/2;
        var date = moment(this.state.profile.createdAt).format('MMMM Do YYYY');
    return (
            <div className="profile-container">
            <div className="profile-topbar">
                <div className="profile-info" >
                    <div className="profile-img-container prof">
                        <img className="profile-img" src={this.state.profile.profile_pic}/>
                    </div>
                    <div className="profile-maininfo prof">
                        <div className="profile-name"> {this.state.profile.name}</div>
                        
                        <div className="profile-category"> {(this.state.profile.profileCategory).toUpperCase()} </div>
                        <div className="profile-city"><span className="profile-head-city">City:</span> {this.state.profile.city} </div>
                        
                        <StarRatingComponent 
                            className="profilestars"
                            name="singleprofilerating" 
                            starCount={5}
                            value={score}
                            editing={false} 
                        />
                        
                    </div>
                    <div className="box-buttons prof">
                         <Reviewsmodaldisplay reviews= {this.state.reviews} profile={this.state.profile} />
                        <Email username={this.props.params.username} name={this.state.profile.name} />
                        <Createreviewmodal  name={this.state.profile.name} onReviewSubmit={this._reviewSubmitted} username={this.props.params.username} />
                    </div>
                </div>
                </div>
                
                <div className="portfolio-padding background">
                    <div className="center">
                        <h2 className="page-subtitle port-title">Portfolio</h2>
                    </div>
                    <Galleryslider key="galleryslider" photos={this.state.photos} />
                    <div className="profile-box">
                        
                        <div className="cv-info content-padding">
                            <hr />
                            <h2 className="page-subtitle prof-spacing">Relevant Experience</h2>
                            
                            <div className="prof-space">
                                <h3 className="profile-header content-green">Specialities: </h3>
                                <p className="profile-para"> {this.state.profile.specialities} </p>
                            </div>
                            <div className="prof-space">
                                <h3 className="profile-header content-green">Previous Employment:</h3>
                                <p className="profile-para">{this.state.profile.employment}</p>
                            </div>
                            <div>
                                <h3 className="profile-header content-green">Education:</h3>
                                <p className="profile-para">{this.state.profile.education}</p>
                            </div>
                            <hr />        
                            
                            <h2 className="page-subtitle prof-spacing">Member Info</h2>
                            <h3 className="profile-header content-green">Member Since:</h3> 
                            <p className="profile-para">{date} </p>
                        </div>
                        </div>
                    </div>
                    {this.props.children}
            </div>
    );
  }
});


module.exports = Profile;

