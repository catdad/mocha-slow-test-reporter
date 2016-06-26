# mocha-slow-test-reporter

[![Build][1]][2]
[![Downloads][7]][8]
[![Version][9]][8]
[![Dependency Status][10]][11]

[1]: https://travis-ci.org/catdad/mocha-slow-test-reporter.svg?branch=master
[2]: https://travis-ci.org/catdad/mocha-slow-test-reporter

[7]: https://img.shields.io/npm/dm/mocha-slow-test-reporter.svg
[8]: https://www.npmjs.com/package/mocha-slow-test-reporter
[9]: https://img.shields.io/npm/v/mocha-slow-test-reporter.svg

[10]: https://david-dm.org/catdad/mocha-slow-test-reporter.svg
[11]: https://david-dm.org/catdad/mocha-slow-test-reporter

A simple little reporter that detects slow tests in Mocha, and prints a list of the name and time, ordered by slowest first.

## Install

    npm install --save-dev mocha-slow-test-reporter
    
## Use

    mocha --reporter mocha-slow-test-reporter

By default, all test slower than 75 milliseconds will be listed. You can configure that using the `--slow` tag, as such:

    mocha --reporter mocha-slow-test-reporter --slow 20
    
## Output

Here's a sample of the output.


```
Slow test count: 6

514ms  [slow test long name] 512ms pariatur laboris laborum sint aliqua
       fugiat sint ipsum tempor esse mollit aliqua et ad enim exercitation
       laborum in anim labore mollit enim officia proident fugiat commodo
       proident velit et reprehenderit labore dolore mollit nulla laboris
       voluptate officia aute cupidatat qui incididunt anim ipsum aliquip
       elit esse eu est veniam in aliqua consequat

512ms  [slow tests] 512ms

257ms  [slow tests] 256ms

257ms  [slow test long name] 256ms in aute Lorem mollit veniam in nostrud
       quis anim non laboris nostrud labore cupidatat in magna officia et
       officia id elit duis nulla aliqua eu cillum

129ms  [slow tests] 128ms

128ms  [slow test long name] 128ms laborum ad nisi est minim non duis
       deserunt est id ullamco id anim
```
