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
              infinite: false,
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 850,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            };
        return (
            <div >
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