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

  // Use lodash mixin to create sublime text project file
  // when a new project is created. Delete them if you don't
  // need them ;-)
  grunt.util._.mixin(require('./lib/mixins').init(grunt));

  init.process({type: 'assemble'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version', '0.1.0'),
    init.prompt('description', '{{foo}} helper, for doing bar and baz.'),
    init.prompt('author_name'),
    init.prompt('author_url'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses')
  ], function(err, props) {

    // Set a few grunt-plugin-specific properties.
    props.hompage    = 'https://github.com/assemble/' + props.name + '/';
    props.repository = 'https://github.com/assemble/' + props.name + '.git';
    props.keywords   = ['helper', 'mixin', 'handlebars helper', 'underscore mixin', 'filter', 'template filter', 'swig filter', 'lodash', 'underscore', 'convenience methods'];
    props.devDependencies = {
      'assemble-internal': '~0.2.0'
    };
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