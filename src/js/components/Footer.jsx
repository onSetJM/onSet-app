var React = require('react');
var Link = require("react-router").Link;

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
      <hr />
      <div className="footer-nav">
        <nav className="footer-profiles">
          <Link to={"/"} className="footerbuttons">Home</Link>
          <Link to={"/search/hairstylist"} className="footerbuttons">Browse Profiles</Link>
          <Link to={"/profile"} className="footerbuttons">View Your Profile</Link>
        </nav>
        <nav className="footer-about-us">
          <Link to={"/"} className="footerbuttons">How It Works</Link>
          <Link to={"/"} className="footerbuttons">Our Vision</Link>
          <Link to={"/faq"} className="footerbuttons">FAQ</Link>

        </nav>
        <nav className="footer-connect">
          <Link to={"/contactus"} className="footerbuttons">Contact Us</Link>
          <Link to={"/careers"} className="footerbuttons">Careers</Link>
            <ul className="socialmediaicons">
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-github-square" aria-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/watch?v=-tCTm5M3Cp8"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
            </ul>
        </nav>
      </div>
      <hr />
      </div>
    );
  }
});

module.exports = Footer;