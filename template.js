/*
 * grunt-init-helper-mod
 * https://github.com/assemble/assemble
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Grunt init template for creating Assemble helpers.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about creating Assemble projects, ' +
  'please see the docs at http://assemble.io/docs/';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Visit http://assemble.io/docs/Helpers for more information ' +
  'about creating, installing and using helpers.';

// The actual init template.
exports.template = function(grunt, init, done) {

  var _ = grunt.util._;

  _.mixin({
    /**
     * Replaces dashes with underscores and strips keywords
     * @param  {[type]} name The name to be modified
     * @return {[type]}      The "safe" short version of the name
     * @example: _.shortname("helper-foo") => "foo"
     */
    shortname: function (name, patterns) {
      var prefixes = ['assemble', 'assemble-contrib', 'handlebars-helper', 'helper', 'mixin', 'grunt'];
      prefixes = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
      var re = new RegExp('^(?:' + prefixes.join('|') + ')[-_]?');
      return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
    }
  });

  init.process({type: 'assemble'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('username', 'jonschlinkert'),
    init.prompt('version'),
    init.prompt('description'),
    init.prompt('author_name'),
    init.prompt('author_url'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses')
  ], function(err, props) {

    // Set a few grunt-plugin-specific properties on the context.
    props.shortname   = _.shortname(props.name);
    props.description = '{{' + _.shortname(props.name) + '}} handlebars helper.';
    props.homepage    = 'https://github.com/' + props.username + '/' + props.name;
    props.author_url  = 'https://github.com/' + props.username;
    props.repository  = 'https://github.com/' + props.username + '/' + props.name + '.git';
    props.bugs        = 'https://github.com/' + props.username + '/' + props.name + '/issues';
    props.main        = './index.js';
    props.dependencies = {
      'lodash': '~2.2.1',
      'handlebars': '~1.0.12',
      'pretty': '~0.1.1'
    };
    props.devDependencies = {
      'grunt': '~0.4.1',
      'assemble': '~0.4.1',
      'grunt-contrib-clean': '~0.5.0',
      'grunt-contrib-jshint': '~0.6.0',
      'grunt-readme': '~0.1.0'
    };
    props.keywords   = [props.name, 'assemble', 'handlebars helper', 'helper', 'grunt'];

    props.travis = /y/i.test(props.travis);
    props.travis_node_version = '0.8';

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};