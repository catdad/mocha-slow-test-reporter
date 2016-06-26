/* jshint node: true, mocha: true, expr: true */

var path = require('path');

var expect = require('chai').expect;
var shellton = require('shellton');

var CWD = path.resolve(__dirname, '..');
var COMMAND = 'mocha fixtures -R slow-reporter.js';

function longTest(that) {
    that.timeout(6 * 1000);
}

describe('[reporter]', function() {
    it('executes and exists correctly', function(done) {
        longTest(this);
        
        shellton({
            task: COMMAND,
            cwd: CWD
        }, function(err, stdout, stderr) {
            expect(err).to.not.be.ok;
            expect(stderr.trim()).to.equal('');
            
            expect(stdout).to.be.a('string')
                .and.to.have.property('length')
                .and.to.be.at.least(50);
            
            done();
        });
    });
    
    it('can be forced to a particular length', function(done) {
        longTest(this);

        // let's set to a really large value
        var W = 200;
        
        shellton({
            task: COMMAND,
            cwd: CWD,
            env: {
                FORCE_TTY_WIDTH: W
            }
        }, function(err, stdout, stderr) {
            expect(err).to.not.be.ok;
            expect(stderr.trim()).to.equal('');
            
            var lines = stdout.split('\n');
            
            var maxWidth = Math.max.apply(Math, lines.map(function(v) {
                return v.length;
            }));
            
            expect(maxWidth).to.be.at.least(W - 10).and.to.be.at.most(W);
            
            done();
        });
    });
});
