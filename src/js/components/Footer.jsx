var React = require('react');
import {Button} from 'react-bootstrap';
var Link = require("react-router").Link;
var ViewYourProfile = require("./navbuttons/ViewYourProfile");

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
      <hr />
      <div className="footer-nav">
        <nav className="footer-profiles">
          <Link to={"/"} className="footerbuttons foot-link">Home</Link>
          <Link to={"/search/hairstylist/montreal/profileScore"} className="footerbuttons foot-link">Browse Profiles</Link>
          <ViewYourProfile className="footerbuttons">View Your Profile</ViewYourProfile>
        </nav>
        <nav className="footer-about-us">
          <Link to={"/"} className="footerbuttons">How It Works</Link>
          <Link to={"/"} className="footerbuttons">Our Vision</Link>
          <Link to={"/faq"} className="footerbuttons">FAQ</Link>

        </nav>
        <nav className="footer-connect">
          <Link to={"/contactus"} className="footerbuttons">Contact Us</Link>
          <Link to={"/careers"} className="footerbuttons ">Careers</Link>
            <div className="socialmediaicons">
              <a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-instagram" aria-hidden="true"></i></a>
              <a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-github-square" aria-hidden="true"></i></a>
              <a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-twitter" aria-hidden="true"></i></a>
          </div>
        </nav>
      </div>
      <hr />
      </div>
    );
  }
});

module.exports = Footer;