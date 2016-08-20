var React = require('react');
var BrowseButton = require("./navbuttons/BrowseButton")
var HomeButton = require("./navbuttons/HomeButton")
var FAQbutton = require("./navbuttons/FAQbutton")
var HowItWorksButton = require("./navbuttons/HowItWorksButton")
var OurVisionButton = require("./navbuttons/OurVisionButton")
var ContactUsButton = require("./navbuttons/ContactUsButton")
var CareersButton = require("./navbuttons/CareersButton")
var ViewYourProfile = require("./navbuttons/ViewYourProfile")

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
      <hr />
      <div className="footer-nav">
        <nav className="footer-profiles">
          <HomeButton className="footerbuttons" />
          <BrowseButton className="footerbuttons" />
          <ViewYourProfile className="footerbuttons" />
        </nav>
        <nav className="footer-about-us">
          <HowItWorksButton className="footerbuttons" />
          <OurVisionButton className="footerbuttons" />
          <FAQbutton className="footerbuttons" />

        </nav>
        <nav className="footer-connect">
        <ul>
          <ContactUsButton className="footerbuttons" />
          <CareersButton className="footerbuttons" />
          <li>
            <ul className="socialmediaicons">
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-github-square" aria-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
            </ul>
          </li>
        </ul>
      </nav>
      </div>
      <hr />
      </div>
    );
  }
});

module.exports = Footer;