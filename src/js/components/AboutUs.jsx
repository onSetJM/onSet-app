var React = require("react");
var HeaderOther = require("./HeaderOther");

var AboutUs = React.createClass({
    render: function() {
        return (
            <div>
            <HeaderOther />
            <div className="content-padding">
                <h2 className="page-main-title about">About Us</h2>
                <div className="about-us">
                    <div className="bio">
                        <h3 className="page-subtitle content-green">Jess Mitchell</h3>
                            <img className="bioimg" src="./img/jess.jpg"/>
                            <p className="biop">Jess is a Toronto-born, Montreal-based psych grad turned web developer.</p>
                        <a href="https://github.com/jessmitch42">
                            <i className="fa fa-github-square github" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="bio">
                        <h3 className="page-subtitle content-green">Max Martin</h3>
                            <img className="bioimg" src="./img/max.png"/>
                            <p className="biop">Max is Montreal-born math grad turned web developer.</p>
                            <a href="https://github.com/Martimax21">
                                <i className="fa fa-github-square github" aria-hidden="true"></i>
                            </a>
                    </div>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports= AboutUs;