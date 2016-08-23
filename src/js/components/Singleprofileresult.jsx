var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var StarRatingComponent = require('react-star-rating-component');



var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        var score = (this.props.profile.profileScore)/2;
        return (
            <div className="singleprofilecontainer">
                <Link to={url}>
                <img className="searchresultimg" src={this.props.profile.profile_pic}/>
                </Link>
                <div className="singleprofiletext">
                    <div className="profilename">
                        <Link to={url}>
                            <p className="profile-nickname">{this.props.profile.name}</p>
                        </Link>
                        
                        <div>
                        <StarRatingComponent 
                         name="singleprofilerating" 
                         starCount={5}
                         value={score}
                         editing={false} />
                         </div>
                         <div> ({score}) </div>
                    </div>
                    <div className="profile-details">
                        
                        <div><strong>{this.props.profile.profileCategory} </strong> </div>
                        <div><strong>{this.props.profile.city} </strong>  </div>
                        <div><strong>Speciality:</strong> </div>
                        <div><p> {this.props.profile.specialities} </p> </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Singleprofileresult;
