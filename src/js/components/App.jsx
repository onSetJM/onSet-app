var Header = require('./Header');
var Footer = require('./Footer');
var React = require('react');
var Login = require("./Login");

var App = React.createClass({
    render: function() {
        
    var children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }
        return (
          <div>
            <Header />
                {children}
            <Footer />
          </div>
        );
    }
});

module.exports = App;
// var React = require('react');

// var Header = require("./Header");
// var Footer = require("./Footer");
// var Loggedin = require("./Loggedin");
// import Auth0Lock from 'auth0-lock';


// var App = React.createClass({

//   render: function() {
//     if (this.state.profile) {
//       return (
//         <main>
//           <Header />
//           <Loggedin profile={this.state.profile} lock={this.state.lock} idToken={this.state.idToken} />
//           {this.props.children}
//           <hr/>
//           <Footer/>
//         </main>
//       );
//     }
//     else {
//       return (
//         <div>  
//           <Header lock={this.state.lock} />
//           {this.props.children}
//           <Footer />
//         </div>

//       );
//     }

//   }
// });

// module.exports = App;
