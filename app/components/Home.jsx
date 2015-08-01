/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;
var HomeTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.number
  },
  render: function () {
    return (
      <span>{this.props.title} </span>
    );
  }
});

var Home = React.createClass({

  render: function () {
    var title = 'default title';
    if (process.env.NODE_ENV === 'development') {
      title = 'development only';
    } else {
      title = 'production only';
    }
    return (
      <div>
          <h1>Home</h1>
          <HomeTitle title={title} />
      </div>
    );
  }
});

module.exports = Home;
