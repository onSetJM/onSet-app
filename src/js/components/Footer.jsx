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
          <li><a href="/search">Browse Profiles</a></li>
          <li><a href="/createprofile">Create/View Your Profile</a></li>
        </ul>
        </nav>
        <nav className="footer-about-us">
        <ul>
          <li><a href="/">How It Works</a></li>
          <li><a href="/">Our Vision</a></li>
          <li><a href="/FAQ">FAQ</a></li>
        </ul>
        </nav>
        <nav className="footer-connect">
        <ul>
          <li><a href="/">Contact Us</a></li>
          <li><a href="/">Careers</a></li>
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