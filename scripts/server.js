#!/usr/bin/env node
/**********************************************************
 * Server for testing.
 * - Watches files and runs `make` if any changes.
 **********************************************************/
var express = require('express');
var path    = require('path');
var root    = path.resolve(__dirname, '..');
var public  = path.join(root, 'public');


var port = process.env.PORT || 3000;

var app = express();

app.use(express.logger('dev'));
app.use(express.static(public));
app.listen(port);

console.log('Server running at http://localhost:%s/', port);

/**
 * Watch files for changes, running `make` on change.
 *
 * Might be overkill, but I'm blacklisting and
 * whitelisting so that nothing is watched that
 * shouldn't be.
 */
var spawn = require('child_process').spawn;
var watch = require('watch');
var watchBlacklist = [
    /\.git/,
    /node_modules/,
    /scripts\/.+.js$/,
    /scripts\/.+.sh$/,
    /package.json$/,
    /LICENCE/,
    /Instructions.md/,
    /min\.css$/,
    /min\.js$/,
    /\.sh$/,
    /\.html$/,
    /public\/font/,
    /public\/img/,
    /\.ico/
];

var watchWhitelist = [
    /\.json/,
    /\.md$/,
    /\.js$/,
    /\.less$/,
    /\.jade$/
];

watch.createMonitor(root, function (monitor) {
    console.log('Monitoring', root);
    monitor.on("created", handleChange);
    monitor.on("changed", handleChange);
    monitor.on("removed", handleChange);
});

function handleChange(file) {
    var blacklisted = false;
    watchBlacklist.forEach(function(rx) {
        if (file.match(rx)) blacklisted = true;
    });
    if (blacklisted) return;

    var whitelisted = false;
    watchWhitelist.forEach(function(rx) {
        if (file.match(rx)) whitelisted = true;
    });
    if (!whitelisted) return;

    var makeArgs = (file.match(/less/) ? ['css'] : (file.match(/js$/) ? ['js'] : ['generate']));

    console.log('--------------------------------------------------------------------------------');
    console.log('| Change:', file);
    console.log('--------------------------------------------------------------------------------');

    var make = spawn('make', makeArgs, { env: process.env, stdio: 'inherit' });

    make.on('close', function() {
        console.log('--------------------------------------------------------------------------------');
    });
}
