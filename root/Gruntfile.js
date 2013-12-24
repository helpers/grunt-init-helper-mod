/*
 * {%= name %}
 * https://github.com/helpers/{%= name %}
 * Copyright (c) {%= grunt.template.today('yyyy') %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    site: grunt.file.readYAML('test/fixtures/_config.yml'),

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'index.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Build HTML from templates and data
     */
    assemble: {
      options: {
        flatten: true,
        site: '<%= site %>',
        assets: 'test/assets',
        partials: ['test/fixtures/includes/*.hbs'],
        layout: 'test/fixtures/layouts/default.hbs',
        data: ['test/data/*.{json,yml}'],
        helpers: ['./index.js']
      },
      target: {
        src: ['test/fixtures/index.hbs'],
        dest: 'test/actual/'
      }
    },


    /**
     * Before generating any new files,
     * remove files from previous build.
     */
    clean: {
      example: ['test/actual/*.html']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('assemble');

  // Default tasks to be run.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble', 'readme']);
};
