var envify = require('envify/custom');

module.exports = function (grunt) {
  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  var banner = [
    '/*!',
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

      react_jsx: './app/**/*.jsx',

      entry: './app/start.jsx',
      // the bundled destination directory.
      bundle_dir: './public/built/app',

      vendor_dir: './public/built/vendor',

      css_dir: 'public/built/styles'
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
    uglify: {
      //document: https://www.npmjs.com/package/grunt-contrib-uglify
      options: {
        banner: '<%= banner%>',

        compress: {
          // Maybe we can do like below in code:
          // if we set global_defs.DEBUG==false, it will ignore console.log("xxxxx")
          // if(DEBUG) {
          //     console.log("xxxx")
          // }
          global_defs: {
            DEBUG: false
          },
          dead_code: true
        }
      },
      // uglify task configuration goes here.
      // the named <core> `target`
      prod: {
        options: {
          compress: {
            //Specify drop_console: true as part of the compress options to discard calls to console.* function
            drop_console: true
          }
        },
        files: {
          '<%= _modules.vendor_dir %>/react.min.js': '<%= envify.react.dest %>',
          '<%= _modules.bundle_dir %>/bundle.min.js': '<%= _modules.bundle_dir %>/bundle.js'
        }
      }
    },
    browserify: {
      options: {
        banner: '<%= banner%>',
      },
      // Cause of we don't want to build react,reflux libaray to bundle.js
      // using `external` to ignore it.
      vendor: {
        src: [],
        dest: '<%= _modules.vendor_dir %>/react.js',
        options: {
          require: ['react', 'reflux', 'react-router-component']
        }
      },
      debug: {
        options: {
          external: ['react', 'reflux', 'react-router-component'],
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
        src: ['<%= _modules.react_jsx %>'],
        dest: '<%= _modules.bundle_dir %>/bundle.js'
      },
      prod: {
        options: {
          external: ['react', 'reflux', 'react-router-component'],
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
        src: ['<%= _modules.react_jsx %>'],
        dest: '<%= _modules.bundle_dir %>/bundle.js'
      }
    },
    envify: {
      // used to remove`process.env.NODE_ENV === "development"`
      options: {
        env: {
          NODE_ENV: 'production'
        }
      },
      // handle react lib process.env.NODE_ENV.
      react: {
        src: ['<%= browserify.vendor.dest %>'],
        dest: '<%= _modules.vendor_dir %>/react-envified.js'
      }
    },
    stylus: {
      options: {
        banner: '<%= banner%>',
        sourcemap: {
          comment: true, //Adds a comment with the `sourceMappingURL` to the generated CSS (default: `true`)
          inline: true, //Inlines the sourcemap with full source text in base64 format (default: `false`)
          sourceRoot: ".", //"sourceRoot" property of the generated sourcemap
          basePath: "." //Base path from which sourcemap and all souzrces are relative (default: `.`)
        }
      },
      main: {
        options: {
          paths: ['./stylesheets/mixins/'],
          'include css': true
        },
        files: {
          '<%=_modules.css_dir %>/theme.css': './stylesheets/theme/**/*.styl',
          '<%=_modules.css_dir %>/admin.css': './stylesheets/admin/**/*.styl'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      prod: {
        files: [{
          expand: true,
          cwd: '<%=_modules.css_dir %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%=_modules.css_dir %>',
          ext: '.min.css'
        }]
      }
    },
    nodemon: {
      debug: {
        script: './server/bin/www',
        options: {
          nodeArgs: ['--debug'],
          env: {
            // for development, isomorphic server render react
            NODE_ENV: 'development',
            // require the process.env.NODE_ENV =='development' | 'production'
            DEBUG: 'SPM:*',
            DEBUG_COLORS: true
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
        tasks: ['nodemon:debug', 'watch' /*, 'node-inspector'*/ ],
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

  grunt.registerTask('vendor', ['browserify:vendor']);
  grunt.registerTask('compile', ['eslint', 'vendor', 'browserify:debug', 'stylus']);
  grunt.registerTask('compile:prod', ['vendor', 'envify', 'browserify:prod', 'stylus', 'cssmin', 'uglify']);
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('server', ['concurrent:debug']);
  grunt.registerTask('server:prod', ['compile:prod', 'concurrent:prod']);
};
