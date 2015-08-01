/**
 * @jsx React.DOM
 */

/*eslint-disable no-unused-vars*/
var React = require('react');
/*eslint-disable no-unused-vars*/

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
var Inbox = require('./Inbox.jsx');

// page components.
var BootStrap = require('../BootStrap.jsx');
var Home = require('../components/Home.jsx');
var NotFoundPage = require('../components/NotFound.jsx');
var About = require('../components/About.jsx');


var App = React.createClass({

  showProgressBar: function () {
    // console.log(arguments);
  },

  hideProgressBar: function () {
    // console.log(arguments);
  },

  render: function () {
    return (
      <Locations onBeforeNavigation={this.showProgressBar} onNavigation={this.hideProgressBar}>
        <Location path="/" handler={BootStrap} />
        <Location path="/home" handler={Home} />
        <Location path="/about" handler={About} />
        <Location path="/inbox(/*)" handler={Inbox} />
        <NotFound handler={NotFoundPage} />
      </Locations>
    );
  }

});

// declare our routes and their hierarchy

module.exports = App;
