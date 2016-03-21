/* jshint node: true */

module.exports = SlowReporter;

function SlowReporter(runner, options) {
    var passes = 0;
    var failures = 0;
    var pending = 0;
    
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
        var total = passes + failures + pending;
        
        // console.log('');
        // console.log(
        //     '%d total tests:' + 
        //     '\n   %d passed' + 
        //     '\n   %d failed' + 
        //     '\n   %d pending', total, passes, failures, pending);
            
        console.log('slow test count:', slowTests.length);
        
        var sortedSlow = slowTests.sort(function(a, b) {
            return b.duration - a.duration;
        });
        
        sortedSlow.forEach(function(test) {
            console.log(test.duration + 'ms', test.title);
        });
        
        process.exit(failures);
    }
    
    runner.on('pass', function (test) {
        passes++;
        onTestComplete(test.duration, test.fullTitle());
    });

    runner.on('fail', function (test, err) {
        failures++;
        onTestComplete(test.duration, test.fullTitle());
    });
    
    runner.on('pending', function(test) {
        pending++;
        onTestComplete(test.duration, test.fullTitle());
    });

    runner.on('end', function () {
        onEnd();
    });
}
