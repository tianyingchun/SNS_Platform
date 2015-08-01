var envify = require('envify/custom');

module.exports = function (grunt) {
  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  var banner = [
    '/**',
    ' * <%= pkg.name %> <%= pkg.version %>',
    ' * <%= pkg.homepage %>',
    ' * Copyright (c) 2015  tianyingchun@outlook.com',
    ' * <%= pkg.description %>',
    ' * built on: ' + new Date(),
    ' */',
    ''
  ].join("\n");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: banner,

    _modules: {

      cwd: './',

      eslint: './app/**/*{.jsx,.js}',

      reactJsx: './app/**/*.jsx',

      entry: './app/start.jsx',
      // the bundled destination directory.
      bundle_dir: './public/built/app',

      vendor_dir: './public/built/vendor',

    },
    eslint: {
      //http://eslint.org/docs/rules/
      //https://www.npmjs.com/package/grunt-eslint
      options: {
        configFile: '.eslintrc'
          // outputFile:''
          // format: require('eslint-tap')
      },
      react: [
        // 'Gruntfile.js',
        '<%= _modules.eslint %>'
      ]
    },

    browserify: {
      options: {
        banner: '<%= banner%>',

        external: ['react', 'reflux', 'react-router-component']
      },
      debug: {
        options: {
          browserifyOptions: {
            debug: true,
            entry: '<%= _modules.entry %>'
          },
          transform: [
            ['reactify', {
              es6: true
            }]
          ]
        },
        src: ['<%= _modules.reactJsx%>'],
        dest: '<%= _modules.bundle_dir%>/bundle.js'
      },
      prod: {
        options: {
          browserifyOptions: {
            debug: false,
            entry: '<%= _modules.entry %>'
          },
          transform: [
            envify({
              NODE_ENV: 'production'
            }), ['reactify', {
              es6: true
            }]
          ]
        },
        src: ['<%= _modules.reactJsx%>'],
        dest: '<%= _modules.bundle_dir%>/bundle.js'
      }
    },

    stylus: {
      main: {
        options: {
          paths: ['./stylesheets'],
          'include css': true
        },
        src: ['./stylesheets/**/*.styl'],
        dest: 'public/styles.css'
      }
    },

    nodemon: {
      debug: {
        script: './server/bin/www',
        options: {
          nodeArgs: ['--debug'],
          env: {
            // for development, isomorphic server render react
            // require the process.env.NODE_ENV =='development' | 'production'
            NODE_ENV: 'development'
          },
          ext: 'js,jsx,html,ejs'
        }
      },
      prod: {
        script: './server/bin/www'
      }
    },

    watch: {
      app: {
        files: 'app/**/*',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
      styles: {
        files: './stylesheets/**/*',
        tasks: ['stylus'],
        options: {
          interrupt: true
        }
      }
    },

    concurrent: {
      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      },
      prod: {
        tasks: ['nodemon:prod', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'node-inspector': {
      main: {}
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('compile', ['eslint', 'browserify:debug', 'stylus']);
  grunt.registerTask('compile:prod', ['browserify:prod', 'stylus']);
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('server', ['compile', 'concurrent:debug']);
  grunt.registerTask('server:prod', ['compile:prod', 'concurrent:prod']);
};
