/* jshint node: true */

var tty = require('tty');

var table = require('text-table');
var wrap = require('wordwrap');
var stringLength = require('string-length');
var chalk = require('chalk');

module.exports = SlowReporter;

var isatty = tty.isatty(1) && tty.isatty(2);

var window = { width: 75 };

if (isatty) {
    window.width = process.stdout.getWindowSize ?
        process.stdout.getWindowSize(1)[0] :
        tty.getWindowSize()[1];
}

function SlowReporter(runner, options) {
    var slow = 60;
    var slowTests = [];
    
    function onTestComplete(duration, title) {
        if (duration > slow) {
            slowTests.push({
                title: title,
                duration: duration
            });
        }
    }
    
    function onEnd() {
        console.log(chalk.bold('Slow test count: %s\n'), slowTests.length);
        
        if (slowTests.length === 0) {
            return;
        }
        
        var sortedSlow = slowTests.sort(function(a, b) {
            return b.duration - a.duration;
        });
        
        var slowTable = [];
        
        sortedSlow.forEach(function(test) {
            var wrappedTitle = wrap(10, window.width)(test.title);
            
            var wrappedTokens = wrappedTitle.split('\n');
            var first = wrappedTokens.shift();
            
            var durationColor = test.duration > (slow * 2) ? chalk.red : chalk.yellow;
            var textColor = chalk.gray;
            
            slowTable.push([
                durationColor(test.duration + 'ms'),
                textColor(first.trim())
            ]);
            
            if (wrappedTokens.length) {
                wrappedTokens.forEach(function(token) {
                    slowTable.push([
                        '',
                        textColor(token.trim())
                    ]);
                });
            }
            
            slowTable.push(['', '']);
        });
        
        console.log(table(slowTable, { stringLength: stringLength }));
    }
    
    runner.on('test end', function(test) {
        onTestComplete(test.duration, test.fullTitle());
    });
    
    runner.on('end', function () {
        onEnd();
    });
}
