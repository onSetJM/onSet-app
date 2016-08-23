var React = require("react");
var HeaderOther = require("./HeaderOther");

var FAQ = React.createClass({
    render: function() {
        return (
            <div>
            <HeaderOther />
            <div className="faq content-padding">
                <h2 className="page-main-title">FAQ</h2>
                <div className="subsection-padding">
                    <div className="padding">
                        <h3 className="page-subtitle">What is onSet exactly?</h3>
                            <p>onSet is an online marketplace for professionals in creative 
                            trades where they can create public CVs, including a visual portfolio. 
                            Currently, the visual portfolio uses your top 20 Instagram photos to 
                            show your most recent work. onSet makes it simple; sign in with Instagram, 
                            fill out some extra details about yourself, and that’s it! Interested 
                            employers can email you directly through your profile.</p>
                    </div>
                    <hr />
                    <div className="padding">
                        <h3 className="page-subtitle">Why not just use LinkedIn?</h3>
                            <p className="padding">You could, but we found that LinkedIn doesn’t quite work for professionals
                            in creative trades because so much of your work is visual. If you’re looking 
                            for a space to show off what you’re capable of, onSet profiles with built-in 
                            portfolios let you brag about just how talented you are. </p>
                    </div>
                </div>
            </div>
            </div>
            );
    }
});

module.exports= FAQ;