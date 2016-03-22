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
    var slowTests = [];
    
    var verySlowColor = chalk.red;
    var slowColor = chalk.yellow;
    var textColor = chalk.gray;
    
    function onTestComplete(duration, title, slow) {
        if (duration > slow) {
            slowTests.push({
                title: title,
                duration: duration,
                durText: duration > (slow * 2) ?
                    verySlowColor(duration + 'ms') : 
                    slowColor(duration + 'ms')
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
            
            slowTable.push([
                test.durText,
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
        onTestComplete(test.duration, test.fullTitle(), test.slow() || 60);
    });
    
    runner.on('end', function () {
        onEnd();
    });
}
