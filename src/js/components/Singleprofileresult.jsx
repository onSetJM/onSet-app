var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        return (
            <div className="singleprofilecontainer">
                <div> 
                    <Link to={url}>
                        <p className="profile-nickname">{this.props.profile.name}</p>
                    </Link>
                </div>
                <img src={this.props.profile.profile_pic}/>
                <p> Score :  {this.props.profile.profileScore}</p>
                <p> Total reviews: {this.props.profile.totalReviews} </p>
                <p> Category: {this.props.profile.profileCategory} </p>
                <p> Speciality: {this.props.profile.specialities} </p>
            </div>
        );
    }
});

module.exports = Singleprofileresult;
