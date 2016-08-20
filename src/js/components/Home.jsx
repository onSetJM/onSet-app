var React = require("react");

var Home = React.createClass({
  render: function() {
    return (
      <div className="home-content">
      <h2>How It Works</h2>
      <div className="howitworks">
        <div className="gethired">
        <h3>Get Hired with onSet</h3>
        <p>onSet is built for professionals in creative trades who are looking for 
        freelance work and to network in their field. Not quite sure how it works? 
        If you’re looking to be hired, start by creating a profile, which will be 
        linked to your Instagram account. (Make sure to use your professional 
        Instagram account if you have a personal one too, and make it public so 
        any interested employers can see). Personalize your account as much as you 
        like and you’re good to go! It’s as simple as that. 
  
        onSet is all about having an intuitive, easy-to-use platform for you to show 
        your best work. We know LinkedIn doesn’t show what you’re capable of, and 
        Instagram isn’t the most professional portfolio on its own. With onSet you 
        get the best of both worlds-- a professional CV and visual portfolio.</p>
        </div>
        <div className="hiresomeone">
        <h3>Hire Someone with onSet</h3>
        <p>It can be tough to find talented, reliable professionals in the 
        creative trades if you don’t know how to get connected or who’s 
        up-and-coming talent. onSet lets you search professionals to see who’s 
        available for extra work in your city and excelling in their field. See 
        what each user has accomplished with their visual portfolio and full CV, 
        and feel confident you’re hiring one of the best!
  
        Not sure you can trust everyone is as good as they say they are? We know 
        that feeling of needing a really good recommendation for a hairstylist or 
        makeup artist but not knowing where to look or whom to ask. Well, look no 
        further; onSet has set up a review system on each user’s profile so you 
        can not only see their portfolio but also how others have found working 
        with them. 
  
        To connect with professionals you’re interested in collaborating with, 
        just click the “Connect” button on their profile. You’ll have to sign in 
        with either Google or Instagram but, don’t worry, no other information is 
        needed! </p>
        </div>
        </div>
        <hr />
        <h2>Our Vision</h2>
        <div className="ourvision" id="unique-identifier">
        <h3>What exactly are the “creative trades”?</h3>
        <p>When we say creative trades, we mean hairstylists, makeup artists, 
        personal stylists, costume designers, nail artists, and any other 
        professionals that do manual, creative work. Or, in other words, the types
        of professionals you’re likely to have on-set at a photoshoot. </p>
        <h3>Why onSet?</h3>
        <p>We noticed that the creative trades weren’t being effectively and 
        professionally represented on the most common online CV sites and that 
        many talented professionals end up using Instagram as an online portfolio. 
        We’ve integrated Instagram so you can take your current online presence 
        and upgrade it to include all your professional experiences and achievements. 
        You work hard-- onSet lets you show just how experienced you are.</p>
        
        </div>
    </div>);
  }
});

module.exports = Home;