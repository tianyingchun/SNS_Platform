/**
 * @jsx React.DOM
 */
var React = require('react');

// the application entry
var App = require('./components/App.jsx');

var BootStrap = React.createClass({
  render: function () {

    // var metaHtml =
    //   '<base href="/" />' +
    //   '<meta charSet="utf-8" />' +
    //   '<meta httpEquiv="X-UA-Compatible" content="IE=edge" />' +
    //   '<meta name="viewport" content="width=device-width" initial-scale=1" />' +
    //   '<title><%=pageTitle%></title>' +
    //   '<link href="static/built/styles/bootstrap.css" rel="stylesheet" />' +
    //   '<!--[if lte IE 9]>' +
    //   '<script type="text/javascript" src="/static/built/vendor/react.ie8fix.js"></script>' +
    //   '<![endif]-->' +
    //   '<script type="text/javascript" src="/static/built/vendor/react.js"></script>' +
    //   '<script type="text/javascript" src="/static/built/app/bundle.js"></script>';
    return (
      // <html>
      // <head lang="en" dangerouslySetInnerHTML={{__html: metaHtml}}></head>
      // <body>
        <App />
      // </body>
      // </html>
    );
  }
});

module.exports = BootStrap;
