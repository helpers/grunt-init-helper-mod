/*
 * {%= shortname %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

// Node.js
var path = require('path');
var fs   = require('fs');

// node_modules
var _    = require('lodash');


module.exports.register = function(Handlebars, options, params) {

  var opts = options || {};
  params = params || {};

  var grunt    = params.grunt;
  var assemble = params.assemble;

  /**
   * Process templates using grunt config data and context
   * @param  {Object} grunt   Pass in Grunt to get config.data
   * @param  {Object} context Pass in a context object
   * @return {Object}         Return context with processed config.data
   */
  var processContext = function(grunt, context) {
    grunt.config.data = _.defaults(context || {}, _.cloneDeep(grunt.config.data));
    return grunt.config.process(grunt.config.data);
  };


  /**
   * Accepts two objects (a, b),
   * @param  {Object} a
   * @param  {Object} b
   * @return {Number} returns 1 if (a >= b), otherwise -1
   */
  var compareFn = function(a, b) {
    return a.index >= b.index ? 1 : -1;
  };


  /**
   * {{{%= shortname %}}}
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  exports.{%= _.shortname(name) %} = function(options) {
    var hash = options.hash || {};

    options = _.extend({}, opts, options, options.hash);

    // Join path to 'cwd' if defined in the helper's options
    var cwd = path.join.bind(null, options.cwd);
    grunt.verbose.ok("cwd:".yellow, cwd('/'));

    var content = '<strong>' + options + '</strong>';
    return new Handlebars.SafeString(content);
  };


  /**
   * {{#{%= shortname %}}}...{{/{%= shortname %}}}
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  exports.{%= _.shortname(name) %} = function(options) {
    var hash = options.hash || {};

    options = _.extend({}, opts, options, options.hash);

    // Join path to 'cwd' if defined in the helper's options
    var cwd = path.join.bind(null, options.cwd);
    grunt.verbose.ok("cwd:".yellow, cwd('/'));

    var content = '<strong>' + options + '</strong>';
    return new Handlebars.SafeString(content);
  };

  /**
   * {{pkg}}
   * Return a property from package.json
   * @param  {String} key
   * @return {String}
   * @example
   *  v{{pkg 'version'}} => v0.1.0
   */
  exports.pkg = function(key) {
    opts = _.defaults(opts, require(path.resolve(process.cwd(), 'package.json')));
    return opts[key] || '';
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
