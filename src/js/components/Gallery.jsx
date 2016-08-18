/* global localStorage*/
var React = require("react");
var $ = require('jquery');
var Singlegalleryphoto = require('./Singlegalleryphoto');

var history = require('react-router').browserHistory;


var Gallery = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        console.log(localStorage.instagram_sub);
        var that = this;
        $.ajax({           
            url: '/profile/photos', 
            data: {token: localStorage.instagram_sub},
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
            return <div>LOADING PHOTOS...</div>;
        }
        return (
         <div>
            <div >
            <h3>Photos</h3>
             <ul>
                 {this.state.photos.map(function(photo){
                     return <Singlegalleryphoto key={photo.id} photo = {photo} />;
                 })}
             </ul>
            </div>
         </div>
        );
    }
})
    
module.exports = Gallery;