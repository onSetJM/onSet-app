var React = require('react');
var $ = require('jquery');
var Singleprofileresult = require('./Singleprofileresult');
var HeaderOther = require("./HeaderOther");
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;


var SearchResults = React.createClass({
    getInitialState: function() {
        return {};
    },
    fetchData: function(props){
        var searchObj = {
                 category: this.props.params.category,
                 city: this.props.params.city,
                 sortingMethod: this.props.params.filter
            };
        if(props) {
            searchObj = {
                 category: props.params.category,
                 city: props.params.city,
                 sortingMethod: props.params.filter
            }
        }
        this.setState({
            searchObj:searchObj
        })
        console.log(searchObj, "SEARCHOBJ!!");
        var that = this;
        $.ajax({           
            url: '/searchresults', 
            type: 'POST',
            data: searchObj,
            success: function(result) {
                console.log(result, "THIS IS the result August 30th!!")
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
        if(!this.state.profiles[0]){
            return (
            <div>
                <HeaderOther />
                <h5 className="searchnoresult"> Sorry, we can't find a {this.state.searchObj.category} in {this.state.searchObj.city}. Please try again! </h5>
            </div>
            );
        }
    return (
        <div>    
            <HeaderOther />
            <div className="content-padding">
            <h3 className="page-main-title searchtitle">Search Results</h3>
            <hr />
            <div className="all-search-results">
                 {this.state.profiles.map(function(profile){
                     return <Singleprofileresult key={profile.profileId} profile = {profile} />;
                 })}
            </div>
            </div>
        </div>
    );

  }
});

module.exports = SearchResults;