## aframe-charts-component

[![Version](http://img.shields.io/npm/v/aframe-charts-component.svg?style=flat-square)](https://npmjs.org/package/aframe-charts-component)
[![License](http://img.shields.io/npm/l/aframe-charts-component.svg?style=flat-square)](https://npmjs.org/package/aframe-charts-component)

Make 3D Charts with this component based on [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-charts-component/dist/aframe-charts-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity charts="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-charts-component
```

Then require and use.

```js
require('aframe');
require('aframe-charts-component');
```
