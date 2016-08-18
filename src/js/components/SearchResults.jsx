var React = require('react');
var $ = require('jquery');
var Singleprofileresult = require('./Singleprofileresult');

var history = require('react-router').browserHistory;


var SearchResults = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        $.ajax({           
            url: '/searchresults', 
            data: {category: "Make-up Artist", city: "Montreal", sortingMethod: "profileCreatedAt"},
            type: 'POST',
            success: function(result) {
                console.log(result.profiles);
                that.setState({
                 profiles:result.profiles
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  render: function() {
      if (!this.state.profiles) {
            return <div>LOADING profiles...</div>;
        }
    return (
      <div>
            <div >
            <h3>Profiles</h3>
             <ul>
                 {this.state.profiles.map(function(profile){
                     return <Singleprofileresult key={profile.profileId} profile = {profile} />;
                 })}
             </ul>
            </div>
      </div>
    );

  }
});

module.exports = SearchResults;