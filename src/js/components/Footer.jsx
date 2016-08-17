var React = require('react');
//find ouy how to render autho component
var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
      <hr />
      <div className="footer-nav">
        <nav className="footer-profiles">
        <ul>
          <li>Browse Profiles</li>
          <li>Create/View Your Profile</li>
        </ul>
        </nav>
        <nav className="footer-about-us">
        <ul>
          <li>How It Works</li>
          <li>Our Vision</li>
          <li>FAQ</li>
        </ul>
        </nav>
        <nav className="footer-connect">
        <ul>
          <li>Contact Us</li>
          <li>Careers</li>
        </ul>
        </nav>
      </div>
      <hr />
      </div>
    );
  }
});

module.exports = Footer;