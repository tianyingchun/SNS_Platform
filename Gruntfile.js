module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    _modules: {

      cwd: './',

      eslint: './app/**/*{.jsx,.js}',

      reactEntry: './app/start.jsx',
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
        external: ['react', 'reflux', 'react-router']
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
        src: [],
        dest: '<%= _modules.bundle_dir%>'
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
        src: [],
        dest: '<%= _modules.bundle_dir%>'
      }
    },

    stylus: {
      main: {
        options: {
          paths: ['./stylesheets'],
          'include css': true
        },
        src: ['/stylesheets/*/*.styl'],
        dest: 'public/styles.css'
      }
    },

    nodemon: {
      main: {},
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
      main: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },

      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
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

  grunt.registerTask('compile', ['browserify', 'stylus']);
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('server', ['compile', 'concurrent']);
  grunt.registerTask('server:debug', ['compile', 'concurrent:debug']);
};
