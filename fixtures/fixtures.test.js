/* jshint node: true, mocha: true */

var util = require('util');
var lipsum = require('lorem-ipsum');

describe('[slow tests]', function() {
    
    var times = [2, 4, 8, 16, 32, 64, 128, 256, 512];
    
    times.forEach(function(t) {
        it(t + 'ms', function(done) {
            setTimeout(done, t);
        });
    });
    
    describe('long name', function() {
        times.forEach(function(t) {
            var name = util.format('%dms %s', t, lipsum({ count: Math.max(5, t/10), units: 'words' }));
            
            it(name, function(done) {
                setTimeout(done, t);
            });
        });
    });
});