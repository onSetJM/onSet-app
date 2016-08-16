var React = require('react');
// var img = require("../../public/img/hairphoto.jpeg");
var Header = React.createClass({
  render: function() {
    return (
      <div>
        <img src="/img/hairphoto.jpeg"/>
        <h1>Header</h1>
      </div>
    );
  }
});

module.exports = Header;