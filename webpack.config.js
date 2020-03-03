const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'aframe-charts-component.js',
        path: path.resolve(__dirname, 'dist'),
    },
};