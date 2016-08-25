var React = require('react');
var $ = require('jquery');
/* global localStorage */

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Createprofile = React.createClass({
            getInitialState: function() {
                return {};
            },
            _handleSubmit: function(e) {
                e.preventDefault();
                var profileObj = {
                    city: this.refs.city.value,
                    category: this.refs.category.value,
                    token: localStorage.instagram_sub,
                    specialities: this.refs.specialities.value,
                    username: this.refs.username.value,
                    email: this.refs.email.value,
                    name: this.refs.name.value,
                    instagramauthorized: this.refs.instagramauthorized.value,
                    availability: this.refs.availability.value,
                    profile_pic: this.state.profile.profile_picture,
                    employment: this.refs.employment.value,
                    education: this.refs.education.value
                };
                var that = this;
                $.ajax({
                    url: '/profile/photos',
                    data: {
                        token: localStorage.instagram_sub
                    },
                    type: 'POST',
                    success: function(result) {
                        console.log(result.photos, "THIS IS THE PHOTO ARRAY");
                    },
                    error: function() {
                        console.log('this is the ajax error');
                    }
                });
                $.ajax({
                    url: '/createprofile',
                    data: profileObj,
                    type: 'POST',
                    success: function(result) {
                        history.push(`/profile/${that.refs.username.value}`);
                        window.location.reload();
                    },
                    error: function() {
                        console.log('this is the ajax error');
                    }
                });
                

            },
            componentDidMount: function() {
                var that = this;
                $.ajax({
                    url: '/getInstagramProfile',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('id_token')
                    }
                }).then(
                    function(response) {
                        that.setState({
                            profile: response
                        });
                    }
                )
            },
            render: function() {

                if (!this.state.profile) {
                    return <div>loading...</div>;
                }
    
                var profile = this.state.profile;
                return (
                  <div className="createyourprofile-container content-padding">
                      <h2 className="page-main-title">Create your profile!</h2>
                      <h4 className="page-subtitle">Make sure to brag about all the skills you want employers to know about.</h4>
                      <hr />
                      <h4>The Basics</h4>
                      <div className="create-profile-form">
                          <form id="reviewForm" onSubmit={this._handleSubmit}>
                              <div className="create-profile-flex">
                                  <div className="profile-col1">
                                      <img className="create-profile-img" src={profile.profile_picture} />
                                  </div>
                                  <div className="profile-topform">
                                      <div className="profile-col2">
                                          <div className="profile-form-input">
                                              <div className="bold">Your username</div>
                                              <input type='text' ref='username' className="form-input" defaultValue={profile.username}/>
                                          </div>
                                          <div className="profile-form-input">
                                              <div className="bold">Your Name</div>
                                              <input type='text' ref='name' className="form-input" defaultValue={profile.full_name}/>
                                          </div>
                  
                                          <div className="profile-form-input">
                                              <div className="bold">Email address</div>
                                              <input type="email" ref="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                              <small id="emailHelp" className="form-text text-muted">We'll never share your email.)</small>

                                          </div>
                                      </div>
                                      <div className="profile-col3">
                                          <div className="profile-form-input">
                                              <div className="bold">Enter your city</div>
                                              <input ref="city" type="text" className="form-input" />
                                          </div>
                  
                                          <div className="profile-form-input">
                                              <div className="bold">Typical Availability</div>
                                              <input ref="availability" type="text" className="form-input" />
                                          </div>
                                          <div className="profile-form-input">
                                              <div className="bold">Your Area of Work</div>
                                              <select ref="category">
                                                  <option value="Hairstylist">Hairstylist </option>
                                                  <option value="Make-Up Artist">Make-Up Artist</option>
                                                  <option value="Colorist">Colorist</option>
                                                  <option value="Stylist">Stylist</option>
                                                  <option value="Dualist">Dualist</option>
                                                  <option value="Nail Artist">Nail Artist</option>
                                              </select>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <br />
                              <hr />
                              <div>
                                    <h4 className="cform">Relevant Employment Experience</h4>
                                    <div className="cform">
                                        <div className="bold">Tell us more about what you specialize in.</div>
                                        <p className="profile-form-input-lg">Include here anything you'd like potential employers to know about your work.</p>
                                        <textarea className="profile-form-input-lg" ref="specialities" type="text" />
                                    </div>
                                    <div className="cform">
                                      <p className="bold">Employment History</p> <div>What have you done that an employer should know about?</div>
                                      <textarea className="profile-form-input-lg" ref="employment" type="text" />
                                    </div>
                                    <div className="cform">
                                      <p className="bold">Education</p>
                                      <textarea className="profile-form-input-lg" ref="education" type="text" />
                                    </div>
                                  <div className="authorize-div">
                                      <input className="checkbox" ref="instagramauthorized" type="checkbox" />
                                      <p className="profile-form-input-lg auth-text">Please check this box to authorize us adding your Instagram photos to your account.</p>
                                  </div>
                  
                                  <br />
                                  <button className="btn btn-default active btn-blue">Submit!</button>
                              </div>
                          </form>
                      </div>
                  </div>
            );
        }
    } 
);

module.exports = Createprofile;