#!/usr/bin/env node
var path     = require('path');
var root     = process.cwd();
var argv     = ensure(require('minimist')(process.argv.slice(2)));
var marked   = require('marked');
var jade     = require('jade');
var fs       = require('fs');
var config   = require(argv.config);

debug('Loading:', argv.source);
fs.readFile(argv.source, { encoding: 'utf8' }, function(err, mdown) {
    checkError(err);
    debug('Loaded:', argv.source);

    debug('Generating Markdown');
    marked(mdown, function(err, data) {
        checkError(err);
        debug('Generated Markdown');

        config.content = data;
        config.pretty  = argv.pretty;

        debug('Rendering:', argv.template);
        jade.renderFile(argv.template, config, function(err, html) {
            checkError(err);
            debug('Rendered:', argv.template);

            if (!argv.output) {
                console.log(html);
                process.exit();
            }

            // because gh-pages wants an EOL
            html += '\n\n';

            debug('Writing:', argv.output);
            fs.writeFile(argv.output, html, { encoding: 'utf8' }, function(err) {
                checkError(err);
                debug('Generated:', argv.output);
                process.exit();
            });
        });
    });
});

function checkError(err) {
    if (err) {
        console.trace(err);
        console.log(' ');
        process.exit(1);
    }
}

function debug() {
    if (argv.debug) {
        var util = require('util');
        console.log(util.format.apply(util, arguments));
    }
}

function ensure(args) {
    args.help     = args.h || args.help;
    args.source   = args.s || args.source;
    args.template = args.t || args.template;
    args.config   = args.c || args.config;
    args.output   = args.o || args.output;
    args.pretty   = args.p || args.pretty;
    args.debug    = args.d || args.debug;

    if (!args.help && args._.indexOf('help') === -1 &&
            args.config &&
            args.source) {

        args.config = path.resolve(root, args.config);
        args.source = path.resolve(root, args.source);

        args.output = (args.output ? path.resolve(root, args.output) : false);
        return args;
    }

    // show usage
    console.log([
        'Usage: ./scripts/generate.js [args]',
        '',
        '-s, -source SOURCE_MD     :: Source markdown file (e.g. README.md.',
        '-t, -template JADE_FILE   :: Jade template file.',
        '-c, -config CONFIG_FILE   :: Config file with Jade template locals.',
        '-o, -output [OUTPUT_HTML] :: HTML output file, to stdout if missing.',
        '-p, -pretty               :: Jade \'pretty\' option.',
        '-d, -debug                :: Tell me more.',
        ''
    ].join('\n'));
    process.exit(0);
}

