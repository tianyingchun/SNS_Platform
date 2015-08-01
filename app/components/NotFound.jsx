/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;

var NotFound = React.createClass({
  render: function () {
    return (
      <div>
          <h1>!  NotFound</h1>
      </div>
    );
  }
});

module.exports = NotFound;
