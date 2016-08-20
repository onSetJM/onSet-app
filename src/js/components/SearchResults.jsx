var React = require('react');
var $ = require('jquery');
var Singleprofileresult = require('./Singleprofileresult');

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;


var SearchResults = React.createClass({
    getInitialState: function() {
        return {};
    },
    fetchData: function(props){
        var that = this;
        $.ajax({           
            url: '/searchresults', 
            data: props ? props.searchObj : this.props.searchObj,
            type: 'POST',
            success: function(result) {
                that.setState({
                 profiles:result.profiles
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
    },
    componentDidMount: function() {
        this.fetchData()
    },
    componentWillReceiveProps: function(nextProps) {
        this.fetchData(nextProps)
    },
  render: function() {
      if (!this.props.searchObj) {
            return <div>LOADING searchObj...</div>;
        }
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