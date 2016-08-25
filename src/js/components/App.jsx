var NavBar = require('./NavBar');
var Footer = require('./Footer');
var React = require('react');
var Login = require("./Login");

var App = React.createClass({
    getInitialState: function() {
      return {
        loggedIn: this.props.route.auth.loggedIn()
      };
    },
    componentDidMount: function() {
      this.props.route.auth.onAuthChanged(this._handleAuthChanged);
    },
    _handleAuthChanged: function() {
      console.log('handle auth changed');
      this.setState({
        loggedIn: this.props.route.auth.loggedIn()
      })
    },
    componentWillUnmount: function() {
      this.props.route.auth.offAuthChanged(this._handleAuthChanged);
    },
 
    render: function() {
        
    var children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }
        return (
          <div className="app-maincomponent">
            <NavBar auth={this.props.route.auth} loggedIn={this.state.loggedIn} />
                {children}
            <Footer />
          </div>
        );
    }
});

module.exports = App;


