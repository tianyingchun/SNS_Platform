/**
 * SNS_Platform 0.0.0
 * 
 * Copyright (c) 2015  tianyingchun@outlook.com
 * 
 * built on: Sun Aug 02 2015 00:18:51 GMT+0800 (CST)
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
(function (process){
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
    if (process.env.NODE_ENV === 'development') {
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

}).call(this,require('_process'))

},{"_process":10,"react":"react"}],5:[function(require,module,exports){
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
var App = require('./routers/App.jsx');

if (typeof window !== 'undefined') {
  window.onload = function () {
    React.render(React.createElement(App, null), document.getElementById('react-app'));
  };
}

},{"./routers/App.jsx":7,"react":"react"}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1,2,3,4,5,6,7,8,9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdGlhbnlpbmdjaHVuL0RvY3VtZW50cy9HaXRodWIvU05TX1BsYXRmb3JtL2FwcC9Cb290U3RyYXAuanN4IiwiL1VzZXJzL3RpYW55aW5nY2h1bi9Eb2N1bWVudHMvR2l0aHViL1NOU19QbGF0Zm9ybS9hcHAvY29tcG9uZW50cy9BYm91dC5qc3giLCIvVXNlcnMvdGlhbnlpbmdjaHVuL0RvY3VtZW50cy9HaXRodWIvU05TX1BsYXRmb3JtL2FwcC9jb21wb25lbnRzL0FwcC5qc3giLCIvVXNlcnMvdGlhbnlpbmdjaHVuL0RvY3VtZW50cy9HaXRodWIvU05TX1BsYXRmb3JtL2FwcC9jb21wb25lbnRzL0hvbWUuanN4IiwiL1VzZXJzL3RpYW55aW5nY2h1bi9Eb2N1bWVudHMvR2l0aHViL1NOU19QbGF0Zm9ybS9hcHAvY29tcG9uZW50cy9NZXNzYWdlLmpzeCIsIi9Vc2Vycy90aWFueWluZ2NodW4vRG9jdW1lbnRzL0dpdGh1Yi9TTlNfUGxhdGZvcm0vYXBwL2NvbXBvbmVudHMvTm90Rm91bmQuanN4IiwiL1VzZXJzL3RpYW55aW5nY2h1bi9Eb2N1bWVudHMvR2l0aHViL1NOU19QbGF0Zm9ybS9hcHAvcm91dGVycy9BcHAuanN4IiwiL1VzZXJzL3RpYW55aW5nY2h1bi9Eb2N1bWVudHMvR2l0aHViL1NOU19QbGF0Zm9ybS9hcHAvcm91dGVycy9JbmJveC5qc3giLCIvVXNlcnMvdGlhbnlpbmdjaHVuL0RvY3VtZW50cy9HaXRodWIvU05TX1BsYXRmb3JtL2FwcC9zdGFydC5qc3giLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJB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QUV2QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtFQUNqQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztJQUMzQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztHQUM3RCxDQUFDO0FBQ0osQ0FBQzs7O0FDVkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAanN4IFJlYWN0LkRPTVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIHRoZSBhcHBsaWNhdGlvbiBlbnRyeVxudmFyIEFwcCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9BcHAuanN4Jyk7XG5cbnZhciBCb290U3RyYXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gdmFyIG1ldGFIdG1sID1cbiAgICAvLyAgICc8YmFzZSBocmVmPVwiL1wiIC8+JyArXG4gICAgLy8gICAnPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz4nICtcbiAgICAvLyAgICc8bWV0YSBodHRwRXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiSUU9ZWRnZVwiIC8+JyArXG4gICAgLy8gICAnPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aFwiIGluaXRpYWwtc2NhbGU9MVwiIC8+JyArXG4gICAgLy8gICAnPHRpdGxlPjwlPXBhZ2VUaXRsZSU+PC90aXRsZT4nICtcbiAgICAvLyAgICc8bGluayBocmVmPVwic3RhdGljL2J1aWx0L3N0eWxlcy9ib290c3RyYXAuY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+JyArXG4gICAgLy8gICAnPCEtLVtpZiBsdGUgSUUgOV0+JyArXG4gICAgLy8gICAnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiL3N0YXRpYy9idWlsdC92ZW5kb3IvcmVhY3QuaWU4Zml4LmpzXCI+PC9zY3JpcHQ+JyArXG4gICAgLy8gICAnPCFbZW5kaWZdLS0+JyArXG4gICAgLy8gICAnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiL3N0YXRpYy9idWlsdC92ZW5kb3IvcmVhY3QuanNcIj48L3NjcmlwdD4nICtcbiAgICAvLyAgICc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCIvc3RhdGljL2J1aWx0L2FwcC9idW5kbGUuanNcIj48L3NjcmlwdD4nO1xuICAgIHJldHVybiAoXG4gICAgICAvLyA8aHRtbD5cbiAgICAgIC8vIDxoZWFkIGxhbmc9XCJlblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBtZXRhSHRtbH19PjwvaGVhZD5cbiAgICAgIC8vIDxib2R5PlxuICAgICAgICA8QXBwIC8+XG4gICAgICAvLyA8L2JvZHk+XG4gICAgICAvLyA8L2h0bWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdFN0cmFwO1xuIiwiLyoqXG4gKiBAanN4IFJlYWN0LkRPTVxuICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkFib3V0PC9oMT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dDtcbiIsIi8qKlxuICogQGpzeCBSZWFjdC5ET01cbiAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXItY29tcG9uZW50Jyk7XG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWUgPVwid3JhcHBlclwiPlxuICAgICAgICA8aGVhZGVyIGlkPVwiaGVhZGVyXCIgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1zdGF0aWMtdG9wXCI+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9ob21lXCIgPmhvbWU8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvaW5ib3hcIiA+aW5ib3g8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYWJvdXRcIiA+YWJvdXQ8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbm90Zm91bmRcIj5ub3Rmb3VuZDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxkaXYgaWQ9XCJwYWdlXCIgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgJ1dlbGNvbWUgdG8geW91ciBJbmJveCd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG4vLyB2YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG4vLyB2YXIgUm91dGVIYW5kbGVyID0gUm91dGVyLlJvdXRlSGFuZGxlcjtcbnZhciBIb21lVGl0bGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByb3BUeXBlczoge1xuICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3Bhbj57dGhpcy5wcm9wcy50aXRsZX0gPC9zcGFuPlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGl0bGUgPSAnZGVmYXVsdCB0aXRsZSc7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB0aXRsZSA9ICdkZXZlbG9wbWVudCBvbmx5JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGUgPSAncHJvZHVjdGlvbiBvbmx5JztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgICAgPGgxPkhvbWU8L2gxPlxuICAgICAgICAgIDxIb21lVGl0bGUgdGl0bGU9e3RpdGxlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZTtcbiIsIi8qKlxuICogQGpzeCBSZWFjdC5ET01cbiAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbi8vIHZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbi8vIHZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xudmFyIE1lc3NhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdsb2FkaW5nIG1lc3NhZ2UhJ1xuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBmcm9tIHRoZSBwYXRoIGAvaW5ib3gvbWVzc2FnZXMvOmlkYFxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlOiAnY29tcG9uZW50RGlkTW91bnQnXG4gICAgfSk7XG5cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZTtcbiIsIi8qKlxuICogQGpzeCBSZWFjdC5ET01cbiAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbi8vIHZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbi8vIHZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xuXG52YXIgTm90Rm91bmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT4hICBOb3RGb3VuZDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RGb3VuZDtcbiIsIi8qKlxuICogQGpzeCBSZWFjdC5ET01cbiAqL1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG4vKmVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzKi9cblxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1jb21wb25lbnQnKTtcbnZhciBMb2NhdGlvbnMgPSBSb3V0ZXIuTG9jYXRpb25zO1xudmFyIExvY2F0aW9uID0gUm91dGVyLkxvY2F0aW9uO1xudmFyIE5vdEZvdW5kID0gUm91dGVyLk5vdEZvdW5kO1xudmFyIEluYm94ID0gcmVxdWlyZSgnLi9JbmJveC5qc3gnKTtcblxuLy8gcGFnZSBjb21wb25lbnRzLlxudmFyIEJvb3RTdHJhcCA9IHJlcXVpcmUoJy4uL0Jvb3RTdHJhcC5qc3gnKTtcbnZhciBIb21lID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Ib21lLmpzeCcpO1xudmFyIE5vdEZvdW5kUGFnZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvTm90Rm91bmQuanN4Jyk7XG52YXIgQWJvdXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0Fib3V0LmpzeCcpO1xuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgc2hvd1Byb2dyZXNzQmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgfSxcblxuICBoaWRlUHJvZ3Jlc3NCYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TG9jYXRpb25zIG9uQmVmb3JlTmF2aWdhdGlvbj17dGhpcy5zaG93UHJvZ3Jlc3NCYXJ9IG9uTmF2aWdhdGlvbj17dGhpcy5oaWRlUHJvZ3Jlc3NCYXJ9PlxuICAgICAgICA8TG9jYXRpb24gcGF0aD1cIi9cIiBoYW5kbGVyPXtCb290U3RyYXB9IC8+XG4gICAgICAgIDxMb2NhdGlvbiBwYXRoPVwiL2hvbWVcIiBoYW5kbGVyPXtIb21lfSAvPlxuICAgICAgICA8TG9jYXRpb24gcGF0aD1cIi9hYm91dFwiIGhhbmRsZXI9e0Fib3V0fSAvPlxuICAgICAgICA8TG9jYXRpb24gcGF0aD1cIi9pbmJveCgvKilcIiBoYW5kbGVyPXtJbmJveH0gLz5cbiAgICAgICAgPE5vdEZvdW5kIGhhbmRsZXI9e05vdEZvdW5kUGFnZX0gLz5cbiAgICAgIDwvTG9jYXRpb25zPlxuICAgICk7XG4gIH1cblxufSk7XG5cbi8vIGRlY2xhcmUgb3VyIHJvdXRlcyBhbmQgdGhlaXIgaGllcmFyY2h5XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1jb21wb25lbnQnKTtcbnZhciBMb2NhdGlvbnMgPSBSb3V0ZXIuTG9jYXRpb25zO1xudmFyIExvY2F0aW9uID0gUm91dGVyLkxvY2F0aW9uO1xudmFyIE1lc3NhZ2UgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL01lc3NhZ2UuanN4Jyk7XG5cbnZhciBJbmJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMb2NhdGlvbnMgY29udGV4dHVhbD5cbiAgICAgICAgPExvY2F0aW9uIHBhdGg9XCIvXCIgaGFuZGxlcj17TWVzc2FnZX0gLz5cbiAgICAgIDwvTG9jYXRpb25zPlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluYm94O1xuXG4iLCIvKipcbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9yb3V0ZXJzL0FwcC5qc3gnKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3QucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWFjdC1hcHAnKSk7XG4gIH07XG59XG5cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl19
