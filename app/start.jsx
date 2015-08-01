/**
 * @jsx React.DOM
 */
var React = require('react');

// Expose `window.React` for dev tools.
window.React = React;

var App = require('./routers/App.jsx');

if (typeof window !== 'undefined') {
  window.onload = function () {
    React.render(<App />, document.getElementById('react-app'));
  };
}

