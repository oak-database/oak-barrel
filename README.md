# `oak-barrel`

[![Build Status](https://travis-ci.org/oak-database/oak-barrel.svg)](https://travis-ci.org/oak-database/oak-barrel)
[![codecov](https://codecov.io/gh/oak-database/oak-barrel/branch/master/graph/badge.svg)](https://codecov.io/gh/oak-database/oak-barrel)
[![npm](https://img.shields.io/npm/v/oak-barrel.svg)](https://www.npmjs.com/package/oak-barrel)
[![Dependency Status](https://david-dm.org/oak-database/oak-barrel/status.svg)](https://david-dm.org/oak-database/oak-barrel)
[![devDependency Status](https://david-dm.org/oak-database/oak-barrel/dev-status.svg)](https://david-dm.org/oak-database/oak-barrel?type=dev)

A barrel is a simple format for storing and transferring individual, variable-length binary objects within a byte array.

## Getting Started

Install the `oak-barrel` package into your project with [npm](https://www.npmjs.com/).

```bash
npm install oak-barrel --save
```

Use the `oak-barrel` module in your project.

```javascript
import Barrel from 'oak-barrel'; // ES6
var Barrel = require('oak-barrel'); // ES5

// Convert from a String into a barrel-formatted Buffer
let barrel = Barrel.fromText('Hello, World!');
// <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 ff>

// Convert from a barrel-formatted Buffer into a String
let text = Barrel.toText(barrel);
// 'Hello, World!'
```

## API

The public interface for `oak-barrel` is defined in the [API Guide](https://github.com/oak-database/oak-barrel/blob/master/docs/api.md).

## Contributing

Pull requests are welcome! To get started, see the [Contributing Guide](https://github.com/oak-database/oak-barrel/blob/master/CONTRIBUTING.md).
