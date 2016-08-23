/* global localStorage*/
var React = require("react");
var Slider = require('react-slick');

var $ = require('jquery');
var Singlegalleryphoto = require('./Singlegalleryphoto');

var history = require('react-router').browserHistory;


var Galleryslider = React.createClass({


    render: function() {
        var settings = {
             dots: false,
             infinite: true,
             speed: 500,
             slidesToShow: 3,
             slidesToScroll: 1
        };
        return (
            <div className='fullcarousel'>
      	<Slider {...settings}>
            {this.props.photos.map(function(photo){
                     return <div key={photo.id}> <img className="carouselimg" src={photo.url} /> </div>;
                 })}
        </Slider>
      </div>
        );
    }

})
    
module.exports = Galleryslider;