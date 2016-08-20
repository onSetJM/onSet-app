var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        return (
            <div className="singleprofilecontainer">
                <img className="searchresultimg" src={this.props.profile.profile_pic}/>
                <div className="singleprofiletext">
                    <div className="profilename">
                        <Link to={url}>
                            <p className="profile-nickname">{this.props.profile.name}</p>
                        </Link>
                    </div>
                    <div className="profile-details">
                        <div><strong>Category:</strong> {this.props.profile.profileCategory} </div>
                        <div><strong>Total reviews:</strong> {this.props.profile.totalReviews} </div>
                        <div><strong>Score:</strong> {this.props.profile.profileScore}</div>
                        <div><strong>Speciality:</strong> {this.props.profile.specialities} </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Singleprofileresult;
