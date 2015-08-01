/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;
var Message = React.createClass({

  getInitialState: function () {
    return {
      message: 'loading message!'
    };
  },

  componentDidMount: function () {
    // from the path `/inbox/messages/:id`

    this.setState({
      message: 'componentDidMount'
    });

  },
  render: function () {
    return (
      <div>
          {this.state.message}
      </div>
    );
  }

});

module.exports = Message;
