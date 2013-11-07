# {{{%= shortname %}}} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %})

> {%= description %}

## Quickstart
In the root of your project, run the following in the command line:

```bash
npm i {%= name %} --save-dev
```
## Quickstart
Install the helper with: `npm install handlebars-helper-{%= shortname %} --save`

## Usage with Assemble
If you use [Assemble](http://assemble.io) and Grunt, you have some simple options for adding helpers.

### Option #1
Add `handlebars-helper-{%= shortname %}` to the `helpers` property in the [Assemble](http://assemble.io) task or target options in your Gruntfile:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      // You may either register the helper this way.
      helpers: ['handlebars-helper-{%= shortname %}', 'foo/*.js']
    },
    files: {}
  }
});
```
### Option #2

Or, add the `handlebars-helper-{%= shortname %}` module to both the `devDependencies` and the `keywords` array of your project's the package.json, enabling Assemble will automatically resolve the helper. Example:

```json
{
  "name": "your-project",
  "dependencies": {
    "handlebars-helper-{%= shortname %}": "*"
  },
  "keywords": [
    "handlebars-helper-{%= shortname %}"
  ]
}
```

You can now use begin using the helper in your templates:

```handlebars
{{{%= shortname %} "path/to/{%= name %}"}}
```
or

```handlebars
{{#{%= shortname %}}}
  My content
{{/{%= shortname %}}}
```

## Helper Options
### foo
Type: `String` (optional)
Default value: `''`

The `cwd` for paths defined in the helper.

### bar
Type: `String`
Default value: `\n`

The separator to append after each inlined file.

### baz
Type: `Function`
Default value: `function(a, b) {return a.index >= b.index ? 1 : -1;}`

Compare function for sorting the resulting files.



### Defining Options
> Options can be defined in either of the following ways:

### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
{{{%= shortname %} 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}
```

Note that **Options defined in the hash always win**!


### "assemble" task options
> If you use Grunt and [Assemble](http://assemble.io), you can pass options from the `assemble` task in the Gruntfile to the helper.

This helper registers the [custom `{%= shortname %}` property](http://assemble.io/docs/Custom-Helpers.html), in the Assemble options, enabling options for the helper to be defined in the Assemble task or target options, e.g.:

```js
assemble: {
  options: {
    {%= shortname %}: {
      // {%= shortname %} helper options here
    }
  }
}
```

## Examples

### Hash options

```handlebars
{{{%= shortname %} 'foo/*.hbs' bar="\n"}}
```


### Usage with [Assemble](http://assemble.io)

In your project's Gruntfile, options for the `{{{%= shortname %}}}` helper can be defined in the Assemble task options:

```js
assemble: {
  options: {
    helpers: ['{%= name %}'],
    {%= shortname %}: {
      foo: 'foo',
      bar: function(src) {
        return src;
      },
      baz: {
        alpha: ''
      }
    }
  },
  files: {}
}
```


## Author

+ [github/jonschlinkert](http://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License and Copyright

Licensed under the [MIT License](./LICENSE-MIT)
Copyright (c) Jon Schlinkert, contributors.