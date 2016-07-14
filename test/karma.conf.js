// Karma configuration
// Generated on 2016-02-25

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/sifter/sifter.js',
      'bower_components/microplugin/src/microplugin.js',
      'bower_components/selectize/dist/js/selectize.js',
      'bower_components/angular-selectize2/dist/angular-selectize.js',
      'bower_components/momentjs/moment.js',
      'bower_components/pikaday/pikaday.js',
      'bower_components/pikaday-responsive/dist/pikaday-responsive.js',
      'bower_components/angularjs-slider/dist/rzslider.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-mask/dist/mask.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/ngprogress/build/ngprogress.min.js',
      'bower_components/SHA-1/sha1.js',
      'bower_components/angulartics/src/angulartics.js',
      'bower_components/angulartics-google-analytics/lib/angulartics-google-analytics.js',
      'bower_components/satellizer/satellizer.js',
      'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
      'bower_components/angular-media-queries/match-media.js',
      'bower_components/alertifyjs/dist/js/alertify.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
