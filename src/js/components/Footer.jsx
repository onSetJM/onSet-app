var React = require('react');
import {Menu, MenuItem} from 'react-foundation';

//find ouy how to render autho component
var Footer = React.createClass({
  render: function() {
    return (
      <div>
      <div className="menu-vertical-example">
        <Menu isVertical>
          <MenuItem><a>One</a></MenuItem>
          <MenuItem><a>Two</a></MenuItem>
          <MenuItem><a>Three</a></MenuItem>
          <MenuItem><a>Four</a></MenuItem>
        </Menu>
      </div>
      <div className="footer">
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
      </div>
      </div>
    );
  }
});

module.exports = Footer;