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
      var profileObj = 
      {
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
         employment: this.state.profile.employment,
         education: this.state.profile.education
        };
      var that = this;
        $.ajax({           
            url: '/profile/photos', 
            data: {token: localStorage.instagram_sub},
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
              that.setState({profile: response});
          }
        )
  },
  render: function() {
      
      if (!this.state.profile) {
          return <div>loading...</div>;
      }
      
      var profile = this.state.profile;
    return (
      <div className="createyourprofile-container">
      <h2>Create your profile!</h2>
      <h4>Make sure to brag about all the skills you want employers to know about.</h4>
      <hr />
      <h4>The Basics</h4>
        <div className="create-profile-form">
            <form  id="reviewForm" onSubmit={this._handleSubmit}>
                <div className="create-profile-flex">
                    <div className="profile-row1">
                        <img className="create-profile-img" src={profile.profile_picture} />
                    </div>
                    <div className="profile-row2">
                        <div className="profile-form-input">
                            Your username
                            <input type='text' ref='username' className="form-input" defaultValue={profile.username}/>
                        </div>
                        <div className="profile-form-input">
                            Your Name
                            <input type='text' ref='name' className="form-input" defaultValue={profile.full_name}/>
                        </div>
                    </div>
                    <div className="profile-row3">
                        <div className="profile-form-input">
                            Your Email
                            <input ref="email" type="text" className="form-input" />
                        </div>
                        <div className="profile-form-input">
                            Enter your city
                            <input ref="city" type="text" className="form-input" />
                        </div>
                    </div>
                    <div className="profile-row4">
                        <div className="profile-form-input">
                            Typical Availability During the Week
                            <input ref="availability" type="text" className="form-input" />
                        </div>
                        <div className="profile-form-input">
                            Your Area of Work
                            <select ref="category" >
                                <option value="hairstylist">Hairstylist </option>
                                <option value="make-up Artist">Make-up Artist</option>
                                <option value="colorist">Colorist</option>
                                <option value="stylist">Stylist</option>
                                <option value="dualist">Dualist</option>
                                <option value="nailartist">Nail Artist</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <h4>Relevant Employment Experience</h4>
                <p>Tell us more about what you specialize in. Include here anything you'd like potential employers to know about your work and your personal strengths.</p>
                <textarea ref="specialities" type="text" />
                <p>Employment History: What have you done that an employer should know about?</p>
                <input ref="employment" type="text"/>
                <p>Education</p>
                <input ref="education" type="text"/>
                <div className="authorize-div">
                    <input className="auth-radio" ref="instagramauthorized" type="radio"/>
                    <p className="auth-text">Please check this box to authorize us adding your Instagram photos to your account.</p>
                </div>
                
                <br />
                <button className="btn btn-default active btn-blue">Create your profile !</button>
            </form>
        </div>
      </div>
    );
  }
});

module.exports = Createprofile;