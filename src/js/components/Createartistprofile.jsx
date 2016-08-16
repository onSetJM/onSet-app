var React = require('react');
var $ = require('jquery');



var Createartistprofile = React.createClass({
    getInitialState: function() {
        return {};
    },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = 
      {
       userId: 1,
       type: "artist",
       data: this.refs.speciality.value,
       city: this.refs.city.value,
       category: this.refs.text.value
     };
      $.ajax({           
            url: '/createareview', 
            data: { reviewObj: reviewObj},
            type: 'POST',
            cache: false,           
            success: function() {
                this.setState({
                    dataStatus:"success"
                }) ;
            },
            error: function() {
              console.log('error');      
            }.bind(this)
        });
  },
  render: function() {
    return (
      <div>
        <form  id="reviewForm" onSubmit={this._handleSubmit}>
            <p> Please enter a score out of 10 </p>
            <input type="text" ref="score" placeholder="Score out of 10" />
            <p> Enter your city </p>
            <input ref="city" type="textarea" />
            <button > Submit your review !</button>
        </form>
      </div>
    );
  }
});

module.exports = Createartistprofile;