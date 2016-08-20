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
         profile_pic: this.state.profile.profile_picture
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
      <div>
        <form  id="reviewForm" onSubmit={this._handleSubmit}>
            <p>Your username </p>
            <input type='text' ref='username' defaultValue={profile.username}/>
            <p>Your Name</p>
            <input type='text' ref='name' defaultValue={profile.full_name}/>
            <p> Your email </p>
            <input ref="email" type="text" />
            <p> Your profile pics </p>
            <img src={profile.profile_picture} />
            <p> Pick a category of work </p>
            <select ref="category">
                <option value="hairstylist">Hairstylist </option>
                <option value="make-up Artist">Make-up Artist</option>
                <option value="colorist">Colorist</option>
                <option value="stylist">Stylist</option>
                <option value="dualist">Dualist</option>
                <option value="nailartist">Nail Artist</option>
            </select>
            <p> Tell us more about your work </p>
            <p> Example : Any specialities, biggest accomplishments, your sale pitch</p>
            <input ref="specialities" type="text" />
            <p> Availability </p>
            <input ref="availability" type="text" />
            <p> Enter your city </p>
            <input ref="city" type="text" />
            <p> your insta pics blabla </p>
            <input ref="instagramauthorized" type="radio"/>
            <br/>

            <button > Create your profile !</button>
        </form>
      </div>
    );
  }
});

module.exports = Createprofile;