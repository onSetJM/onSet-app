var React = require("react");
var $ = require('jquery');

var history = require('react-router').browserHistory;


var Gallery = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        $.ajax({           
            url: '/profile/photos', 
            type: 'POST',
            success: function(result) {
                console.log(result.photos);
                that.setState({
                 photos:result.photos
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
    },
  
    render: function(){
        if (!this.state.photos) {
            return <div>LOADING FOLLOWERS...</div>;
        }
        return (
      <div>
            <div> photo urls: {this.state.photos}</div>
            
         </div>
        );
    }
})
    
module.exports = Gallery;