var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Message = require('../components/Message.jsx');

var Inbox = React.createClass({
  render: function () {
    return (
      <Locations contextual>
        <Location path="/" handler={Message} />
      </Locations>
    );
  }
});

module.exports = Inbox;

