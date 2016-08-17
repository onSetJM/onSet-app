var React = require('react');
//find ouy how to render autho component
var Footer = React.createClass({
  render: function() {
    return (
      <nav className="footer">
        <div className="footer-profiles">
        <ul>
          <li>Browse Profiles</li>
          <li>Create/View Your Profile</li>
        </ul>
        </div>
        <div className="footer-about-us">
        <ul>
          <li>How It Works</li>
          <li>Our Vision</li>
          <li>FAQ</li>
        </ul>
        </div>
        <div className="footer-connect">
        <ul>
          <li>Contact Us</li>
          <li>Careers</li>
        </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Footer;