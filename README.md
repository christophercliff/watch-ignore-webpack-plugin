# watch-ignore-webpack-plugin

[![Build Status](https://travis-ci.org/christophercliff/watch-ignore-webpack-plugin.png?branch=master)](https://travis-ci.org/christophercliff/watch-ignore-webpack-plugin)

A plugin to ignore files in the Webpack file watcher.

## Installation

```
npm install watch-ignore-webpack-plugin
```

## Usage

```js
var WatchIgnorePlugin = require('watch-ignore-webpack-plugin')

{
    plugins: [
        new WatchIgnorePlugin([
            path.resolve(__dirname, './node_modules/'),
        ]),
    ],
}
```

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/watch-ignore-webpack-plugin/blob/master/LICENSE.md) for details.
