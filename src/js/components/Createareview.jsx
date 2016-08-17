var React = require('react');
var $ = require('jquery');



var Createareview = React.createClass({
    getInitialState: function() {
        return {};
    },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.refs.score.value,
          text: this.refs.reviewText.value,
          userId: 1,
          profileId: 2
      };
      console.log(reviewObj);
      $.ajax({           
            url: '/createareview', 
            data: reviewObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the resuly" + result);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  
    //   $.post('/createareview', {reviewObj: reviewObj}, function(result){
    //         console.log("success");
    //         console.log(result);
    //      })
    },
  render: function() {
    return (
      <div>
        <form  id="reviewForm" onSubmit={this._handleSubmit}>
            <p> Please enter a score out of 10 </p>
            <input type="number" ref="score" placeholder="Score out of 10" />
            <p> Please enter your comments </p>
            <input ref="reviewText" type="textarea" />
            <button > Submit your review !</button>
        </form>
      </div>
    );
  }
});

module.exports = Createareview;


