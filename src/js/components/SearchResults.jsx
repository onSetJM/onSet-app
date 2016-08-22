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
            data: props ? {
                 category: props.params.category,
                 city: props.params.city,
                 sortingMethod: props.params.filter
            } : {
                 category: this.props.params.category,
                 city: this.props.params.city,
                 sortingMethod: this.props.params.filter
            },
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

        if (!this.state.profiles) {
            return <div>LOADING profiles...</div>;
        }
    return (
      <div>
            
            <h3 className="searchresulttitle">Profiles</h3>
             <div className="all-search-results">
                 {this.state.profiles.map(function(profile){
                     return <Singleprofileresult key={profile.profileId} profile = {profile} />;
                 })}
             </div>
      </div>
    );

  }
});

module.exports = SearchResults;