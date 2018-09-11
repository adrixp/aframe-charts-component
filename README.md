## aframe-charts-component

[![Version](http://img.shields.io/npm/v/aframe-charts-component.svg?style=flat-square)](https://npmjs.org/package/aframe-charts-component)
[![License](http://img.shields.io/npm/l/aframe-charts-component.svg?style=flat-square)](https://npmjs.org/package/aframe-charts-component)

Make 3D Charts with this component based on [A-Frame](https://aframe.io).

![animation](https://github.com/adrixp/aframe-charts-component/blob/master/img/all.gif)

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| type         | Chart type. Currently we have bubble, pie, doughnut, bar and cylinder charts            |  bubble             |
| dataPoints | Path to JSON input data |  ../data/data.json  |          |
| axis_position         | Set the axis position            |  {x:0, y:0, z:0}           |
| axis_visible         | If false, axis will be hidden            |  true             |
| axis_color         | Set the axis color            |  red             |
| axis_length         | Set the axis length. By default axis will be adaptive to the dataPoints            |  0             |
| axis_tick_separation         | Set the axis tick separation            |  1             |
| axis_tick_length         | Set the axis tick length            |  0.2             |
| axis_tick_color         | Set the axis tick color            |  red             |
| axis_negative         | Enable negative axis. If all your dataPoints were positive, you would need to set axis_length in order to activate. If not, axis are adaptive to dataPoints by default            |  true             |
| axis_grid         | Enable grid axis            |  false             |
| axis_grid_3D         | Enable negative 3D axis            |  false             |
| axis_text         | Enable axis values            |  true             |
| axis_text_color         | Set the axis text color            |  white             |
| axis_text_size         | Set the axis text size           |  10            |
| pie_radius         | Pie chart radius            |  1             |
| pie_doughnut         | Pie chart doughnut mode           |  false            |

### JSON File
We need this file wich contains the points in order to generate the chart. The path of this file must be included in dataPoint property.

Example JSON file:

```json
[
  {"x": 1, "y": 8, "z": 0, "size": 1, "color": "#ff0000"},
  {"x": -2, "y": 3, "z": 1, "size": 1.5, "color": "#00ff00"},
  {"x": -1, "y": 3, "z": 2, "size": 1, "color": "#0000ff"},
  {"x": 2, "y": 7, "z": 7, "size": 1.5, "color": "#0000ff"},
  {"x": 1, "y": 6, "z": 3, "size": 1, "color": "#4CC3D9"}
]  
```


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
    <a-entity charts="dataPoints: ../data/data.json; type: bar"></a-entity>
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
