var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        return (
            <li className="singleprofilecontainer">
                <div> 
                    <Link to={url}>
                        <p className="profile-nickname">{this.props.profile.name}</p>
                    </Link>
                </div>
                <img src={this.props.profile.profile_pic}/>
                <div> Score :  {this.props.profile.profileScore}</div>
                <div> Total reviews: {this.props.profile.totalReviews} </div>
                <div> Category: {this.props.profile.profileCategory} </div>
                <p> Speciality: {this.props.profile.specialities} </p>
            </li>
        );
    }
});

module.exports = Singleprofileresult;
