var React = require('react');
import {Button} from 'react-bootstrap';
var Link = require("react-router").Link;
var ViewYourProfileFoot = require("./navbuttons/ViewYourProfileFoot");

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
      <div className="footer-nav">
        <nav className="footer-profiles">
          <Link to={"/"} className="footerbuttons foot-link">Home</Link>
          <Link to={"/search/hairstylist/montreal/profileScore"} className="footerbuttons foot-link">Browse Profiles</Link>
          <ViewYourProfileFoot className="footerbuttons">View Your Profile</ViewYourProfileFoot>
        </nav>
        <nav className="footer-about-us">
          <Link to={"/"} className="footerbuttons">How It Works</Link>
          <Link to={"/aboutus"} className="footerbuttons">About Us</Link>
          <Link to={"/faq"} className="footerbuttons">FAQ</Link>

        </nav>
        <nav className="footer-connect">
          <Link to={"/contactus"} className="footerbuttons">Contact Us</Link>
          <Link to={"/careers"} className="footerbuttons ">Careers</Link>
            <div className="socialmediaicons">
              <a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-instagram" aria-hidden="true"></i></a>
              <a href="https://github.com/onSetJM/onSetJM.github.io"><i className="fa fa-github-square" aria-hidden="true"></i></a>
              <a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-twitter" aria-hidden="true"></i></a>
          </div>
        </nav>
      </div>
      </div>
    );
  }
});

module.exports = Footer;