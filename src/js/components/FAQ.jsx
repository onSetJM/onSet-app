var React = require("react");

var FAQ = React.createClass({
    render: function() {
        return (
            <div className="faq">
                <h2>FAQ</h2>

                    <h3>What is onSet exactly?</h3>
                        <p>onSet is an online marketplace for professionals in creative 
                        trades where they can create public CVs, including a visual portfolio. 
                        Currently, the visual portfolio uses your top 20 Instagram photos to 
                        show your most recent work. onSet makes it simple; sign in with Instagram, 
                        fill out some extra details about yourself, and that’s it! Interested 
                        employers can email you directly through your profile.</p>
    
                    <h3>Why not just use LinkedIn?</h3>
                        <p>You could, but we found that LinkedIn doesn’t quite work for professionals
                        in creative trades because so much of your work is visual. If you’re looking 
                        for a space to show off what you’re capable of, onSet profiles with built-in 
                        portfolios let you brag about just how talented you are. </p>
            </div>
            );
    }
});

module.exports= FAQ;