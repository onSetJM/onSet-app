/* global localStorage*/
var React = require("react");
var Slider = require('react-slick');

var $ = require('jquery');
var Singlegalleryphoto = require('./Singlegalleryphoto');

var history = require('react-router').browserHistory;


var Galleryslider = React.createClass({


    render: function() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (
            <div className='container'>
      	<Slider {...settings}>
            {this.props.photos.map(function(photo){
                     return <div key={photo.id}> <img src={photo.url} /> </div>;
                 })}
        </Slider>
      </div>
        );
    }

})
    
module.exports = Galleryslider;