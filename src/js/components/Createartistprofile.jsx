var React = require('react');
var $ = require('jquery');

//var history = require('react-router').browserHistory;



var Createartistprofile = React.createClass({
    getInitialState: function() {
        return {};
    },
  _handleSubmit: function(e) {
      e.preventDefault();
      var profileObj = 
      {
       userId: 1,
       type: "artist",
       data: this.refs.specialities.value,
       city: this.refs.city.value,
       category: this.refs.category.value
     };
      console.log(profileObj);
      $.ajax({           
            url: '/createartistprofile', 
            data: profileObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
//     history.push(`/profile/${this.refs.userInput.value}`)
  },
  render: function() {
    return (
      <div>
        <form  id="reviewForm" onSubmit={this._handleSubmit}>
            <p> Pick a category </p>
            <select ref="category">
                <option value="hairstylist">Hairstylist </option>
                <option value="make-up Artist">Make-up Artist</option>
                <option value="colorist">Colorist</option>
                <option value="stylist">Stylist</option>
            </select>
            <p> Detail your specialities </p>
            <input ref="specialities" type="text" />
            <p> Enter your city </p>
            <input ref="city" type="text" />
            <p> Add images of your work to the gallery </p>

            <button > Create your profile !</button>
        </form>
      </div>
    );
  }
});

module.exports = Createartistprofile;