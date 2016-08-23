var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var StarRatingComponent = require('react-star-rating-component');


var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        var score = (this.props.profile.profileScore)/2;
        
        return (
            <Link to={url}>
                <div className="singleprofilecontainer">
                    <div className="singleprofiletop">
                        <img className="searchresultimg" src={this.props.profile.profile_pic}/>
                        <div className="toptext">
                            <h4 className="profile-nickname">{this.props.profile.name}</h4>
                            <StarRatingComponent className="searchprofilestars"
                                 name="singleprofilerating" 
                                 starCount={5}
                                 value={score}
                                 editing={false} />
                        </div>
                    </div>
                   
                    <div className="profile-details">
                        <div className="singleprofilebottom bold">{(this.props.profile.profileCategory).toUpperCase()}</div>
                        <div className="singleprofilebottom bold">{this.props.profile.city}</div>
                        <div className="singleprofilebottom bold">Speciality:</div>
                        <div className="singleprofilebottom">{this.props.profile.specialities} </div>
                    </div>
                </div>
            </Link>
        );
    }
});

module.exports = Singleprofileresult;
