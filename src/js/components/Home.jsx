var React = require("react");
var HeaderHome=require("./HeaderHome");

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderHome />
        <div className="home-content content-padding">
          <h2 className="page-main-title">How It Works</h2>
          <div className="howitworks">
            <div className="gethired vertical-paddingL">
              <h3 className="page-subtitle">Get Hired with onSet</h3>
                <p>onSet is built for professionals in creative trades who are looking for 
                freelance work and to network in their field. 
                If you’re looking to be hired, start by creating a profile, which can be 
                linked to your Instagram account to include a visual portfolio. 
                Personalize your account as much as you like and you’re good to go! It’s as simple as that.</p>
          
                <p>We know a CV doesn't capture what you're really capable of and 
                no one carries around a physical portfolio anymore. With onSet you 
                get the best of both worlds!</p>
            </div>
            <div className="hiresomeone vertical-paddingR">
              <h3 className="page-subtitle">Hire Someone with onSet</h3>
                <p>onSet lets you search professionals to see who’s 
                available for extra work in your city and excelling in their field. See 
                what each user has accomplished with their visual portfolio and full CV, 
                to feel confident you’re hiring one of the best!
          
                Be sure to check out the each artist's reviews to ensure you're connecting with someone
                who will be a good fit. If you're interested in collaborating with someone, 
                just click the “Connect” button on their profile. You’ll have to sign in 
                with either Google or Instagram but, don’t worry, it's just two clicks! </p>
            </div>
          </div>
          <hr />
          <br />
          <h2 className="page-main-title">Our Vision</h2>
          <div className="ourvision">
            <h3 className="page-subtitle">What exactly are the “creative trades”?</h3>
              <p>When we say creative trades, we mean hairstylists, makeup artists, 
              personal stylists, costume designers, nail artists, and any other 
              professionals that do manual, creative work. Or, in other words, the types
              of professionals you’re likely to have on-set at a photoshoot. </p>
            <h3 className="page-subtitle">Why onSet?</h3>
              <p>We noticed that the creative trades weren’t being effectively and 
              professionally represented on the most common online CV sites and that 
              many talented professionals end up using Instagram as an online portfolio. 
              We’ve integrated Instagram so you can take your current online presence 
              and upgrade it to include all your professional experiences and achievements. 
              You work hard-- onSet lets you show just how experienced you are.</p>
          </div>
      </div>
    </div>
    );
  }
});

module.exports = Home;