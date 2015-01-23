var assertDir = require('assert-dir-equal')
var BPromise = require('bluebird')
var fs = require('fs')
var path = require('path')
var WatchIgnorePlugin = require('../')
var webpack = require('webpack')

var DELAY = 500
var BUILD_PATH = path.resolve(__dirname, './build/')
var IGNORE_FILE_PATH = path.resolve(__dirname, './fixtures/ignore/index.js')
var WATCH_FILE_PATH = path.resolve(__dirname, './fixtures/watch/index.js')

describe('the plugin', function () {

    this.timeout(10e3)

    before(reset)
    after(reset)

    it('should not rebuild when an ignored file changes', function (done) {
        var compiler = webpack({
            context: path.resolve(__dirname, './fixtures/'),
            entry: {
                entry: './entry.js',
            },
            output: {
                filename: '[name].js',
                path: BUILD_PATH,
            },
            plugins: [
                new WatchIgnorePlugin([
                    path.resolve(__dirname, './fixtures/ignore/'),
                ]),
            ],
        })
        compiler.watch(DELAY, function (err) {
            if (err) return done(err)
        })
        BPromise
            .delay(DELAY * 2)
            .then(function () {
                assertDir(BUILD_PATH, path.resolve(__dirname, './expected/1/'))
                fs.writeFileSync(WATCH_FILE_PATH, 'module.exports = 3\n')
            })
            .delay(DELAY * 2)
            .then(function () {
                assertDir(BUILD_PATH, path.resolve(__dirname, './expected/2/'))
                fs.writeFileSync(IGNORE_FILE_PATH, 'module.exports = 4\n')
            })
            .delay(DELAY * 2)
            .then(function () {
                assertDir(BUILD_PATH, path.resolve(__dirname, './expected/2/'))
            })
            .then(done, done)
    })

})

function writeFileSync(filename, data) {
    var dirname = path.dirname(filename)
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)
    fs.writeFileSync(filename, data)
}

function reset() {
    writeFileSync(IGNORE_FILE_PATH, 'module.exports = 1\n')
    writeFileSync(WATCH_FILE_PATH, 'module.exports = 2\n')
}
