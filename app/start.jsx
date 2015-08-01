/**
 * @jsx React.DOM
 */
var React = require('react');
var App = require('./routers/App.jsx');

if (typeof window !== 'undefined') {
  window.onload = function () {
    React.render(<App />, document.getElementById('react-app'));
  };
}

