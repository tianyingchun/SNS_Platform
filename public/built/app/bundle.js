/*!
 * SNS_Platform 1.0.0
 * http://github.com/tianyingchun
 * Copyright (c) 2015  tianyingchun@outlook.com
 * The  SNS platform application
 * built on: Sun Aug 02 2015 08:59:04 GMT+0800 (CST)
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var React = require('react');

// the application entry
var App = require('./components/App.jsx');

var BootStrap = React.createClass({displayName: "BootStrap",
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
        React.createElement(App, null)
      // </body>
      // </html>
    );
  }
});

module.exports = BootStrap;

},{"./components/App.jsx":3,"react":"react"}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');
var About = React.createClass({displayName: "About",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "About"), 
        this.props.children
      )
    );
  }
});

module.exports = About;

},{"react":"react"}],3:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');
var Router = require('react-router-component');
var Link = Router.Link;
var App = React.createClass({displayName: "App",

  render: function () {
    return (
      React.createElement("div", {className: "wrapper"}, 
        React.createElement("header", {id: "header", className: "navbar navbar-static-top"}, 
          React.createElement("nav", {className: "collapse navbar-collapse"}, 
            React.createElement("ul", {className: "nav navbar-nav"}, 
                React.createElement("li", null, 
                    React.createElement(Link, {href: "/home"}, "home")
                ), 
                React.createElement("li", null, 
                    React.createElement(Link, {href: "/inbox"}, "inbox")
                ), 
                React.createElement("li", null, 
                    React.createElement(Link, {href: "/about"}, "about")
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "/notfound"}, "notfound")
                )
            )
          )
        ), 
        React.createElement("div", {id: "page", className: "container"}, 
          this.props.children || 'Welcome to your Inbox'
        )
      )
      );
  }
});

module.exports = App;

},{"react":"react","react-router-component":"react-router-component"}],4:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;
var HomeTitle = React.createClass({displayName: "HomeTitle",
  propTypes: {
    title: React.PropTypes.number
  },
  render: function () {
    return (
      React.createElement("span", null, this.props.title, " ")
    );
  }
});

var Home = React.createClass({displayName: "Home",

  render: function () {
    var title = 'default title';
    if ("production" === 'development') {
      title = 'development only';
    } else {
      title = 'production only';
    }
    return (
      React.createElement("div", null, 
          React.createElement("h1", null, "Home"), 
          React.createElement(HomeTitle, {title: title})
      )
    );
  }
});

module.exports = Home;

},{"react":"react"}],5:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;
var Message = React.createClass({displayName: "Message",

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
      React.createElement("div", null, 
          this.state.message
      )
    );
  }

});

module.exports = Message;

},{"react":"react"}],6:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');
// var Router = require('react-router');
// var RouteHandler = Router.RouteHandler;

var NotFound = React.createClass({displayName: "NotFound",
  render: function () {
    return (
      React.createElement("div", null, 
          React.createElement("h1", null, "!  NotFound")
      )
    );
  }
});

module.exports = NotFound;

},{"react":"react"}],7:[function(require,module,exports){
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


var App = React.createClass({displayName: "App",

  showProgressBar: function () {
    // console.log(arguments);
  },

  hideProgressBar: function () {
    // console.log(arguments);
  },

  render: function () {
    return (
      React.createElement(Locations, {onBeforeNavigation: this.showProgressBar, onNavigation: this.hideProgressBar}, 
        React.createElement(Location, {path: "/", handler: BootStrap}), 
        React.createElement(Location, {path: "/home", handler: Home}), 
        React.createElement(Location, {path: "/about", handler: About}), 
        React.createElement(Location, {path: "/inbox(/*)", handler: Inbox}), 
        React.createElement(NotFound, {handler: NotFoundPage})
      )
    );
  }

});

// declare our routes and their hierarchy

module.exports = App;

},{"../BootStrap.jsx":1,"../components/About.jsx":2,"../components/Home.jsx":4,"../components/NotFound.jsx":6,"./Inbox.jsx":8,"react":"react","react-router-component":"react-router-component"}],8:[function(require,module,exports){
var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Message = require('../components/Message.jsx');

var Inbox = React.createClass({displayName: "Inbox",
  render: function () {
    return (
      React.createElement(Locations, {contextual: true}, 
        React.createElement(Location, {path: "/", handler: Message})
      )
    );
  }
});

module.exports = Inbox;

},{"../components/Message.jsx":5,"react":"react","react-router-component":"react-router-component"}],9:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
var React = require('react');

// Expose `window.React` for dev tools.
window.React = React;

var App = require('./routers/App.jsx');

if (typeof window !== 'undefined') {
  window.onload = function () {
    React.render(React.createElement(App, null), document.getElementById('react-app'));
  };
}

},{"./routers/App.jsx":7,"react":"react"}]},{},[1,2,3,4,5,6,7,8,9]);
