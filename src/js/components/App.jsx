var React = require('react');

var Header = require("./Header");
var Footer = require("./Footer");


var App = React.createClass({
  render: function() {
    return (
      <main>
        <h1>onSet</h1>
        <Header component={Header} />
        {this.props.children}
        <hr/>
        <Footer component={Footer} />
      </main>
    );
  }
});

module.exports = App;