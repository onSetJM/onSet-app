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
                    specialities: this.refs.specialities.value,
                    username: this.props.params.username,
                    email: this.refs.email.value,
                    name: this.refs.name.value,
                    instagramauthorized: this.refs.instagramauthorized.value,
                    availability: this.refs.availability.value,
                    employment: this.refs.employment.value,
                    education: this.refs.education.value
                };
                var that = this;
                $.ajax({
                    url: '/editprofile',
                    data: profileObj,
                    type: 'POST',
                    success: function(result) {
                        history.push(`/profile/${that.props.params.username}`);
                    },
                    error: function() {
                        console.log('this is the ajax error');
                    }
                });

            },
            componentDidMount: function() {
                var that = this;
                $.ajax({           
                 url: '/profile', 
                 data: {username:this.props.params.username},
                 type: 'POST',
                  success: function(result) {
                      console.log(result, "this is the result of profile AJAX");
                     that.setState({
                           profile: result.profile
                      });
                      console.log(result.profile, "this is profile token");
                 },
                 error: function() {
                    console.log('this is the ajax error');      
                 }
              });
            },
            render: function() {

                if (!this.state.profile) {
                    return <div>loading...</div>;
                }
    
                var profile = this.state.profile;
                return (
                  <div className="createyourprofile-container content-padding">
                      <h2 className="page-main-title">Edit your profile!</h2>
                      <h4 className="page-subtitle">Make sure to brag about all the skills you want employers to know about.</h4>
                      <hr />
                      <h4>The Basics</h4>
                      <div className="create-profile-form">
                          <form id="reviewForm" onSubmit={this._handleSubmit}>
                              <div className="create-profile-flex">
                                  <div className="profile-col1">
                                      <img className="create-profile-img" src={profile.profile_pic} />
                                  </div>
                                  <div className="profile-topform">
                                      <div className="profile-col2">
                                          <div className="profile-form-input">
                                              <div className="bold">Your username</div>
                                              <input type='text' ref='username' className="form-input" defaultValue={profile.username} disabled/>
                                          </div>
                                          <div className="profile-form-input">
                                              <div className="bold">Your Name</div>
                                              <input type='text' ref='name' className="form-input" defaultValue={profile.name}/>
                                          </div>
                  
                                          <div className="profile-form-input">
                                              <div className="bold" >Email address</div>
                                              <input type="email" ref='email' class="form-control" defaultValue={profile.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                          </div>
                                      </div>
                                      <div className="profile-col3">
                                          <div className="profile-form-input">
                                              <div className="bold" >Enter your city</div>
                                              <input ref="city" type="text" defaultValue={profile.city} className="form-input" />
                                          </div>
                  
                                          <div className="profile-form-input">
                                              <div className="bold" >Typical Availability During the Week</div>
                                              <input ref="availability" defaultValue={profile.availability} type="text" className="form-input" />
                                          </div>
                                          <div className="profile-form-input">
                                              <div className="bold">Your Area of Work</div>
                                              <select ref="category" defaultValue={profile.category} >
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
                                  <h4>Relevant Employment Experience</h4>
                                  <div className="bold">Tell us more about what you specialize in.</div>
                                  <div className="profile-form-input-lg">Include here anything you'd like potential employers to know about your work and your personal strengths.</div>
                                  <textarea className="profile-form-input-lg" ref="specialities" defaultValue={profile.specialities} type="text" />
                                  <p>Employment History: What have you done that an employer should know about?</p>
                                  <textarea className="profile-form-input-lg" ref="employment" defaultValue={profile.employment} type="text" />
                                  <p>Education</p>
                                  <textarea className="profile-form-input-lg" ref="education" type="text" defaultValue={profile.education} />
                                  <div className="authorize-div">
                                      <input ref="instagramauthorized" type="checkbox" />
                                      <p className="profile-form-input-lg auth-text">Please check this box to authorize us adding your Instagram photos to your account.</p>
                                  </div>
                  
                                  <br />
                                  <button className="btn btn-default active btn-blue">Edit your profile !</button>
                              </div>
                          </form>
                      </div>
                  </div>
            );
        }
    } 
);

module.exports = Createprofile;