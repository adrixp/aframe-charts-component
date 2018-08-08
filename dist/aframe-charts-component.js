/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A-Charts component for A-Frame.
 */
AFRAME.registerComponent('charts', {
    schema: {
        type: {type: 'string', default: 'bubble'},
        dataPoints: {type: 'asset'}
    },

    /**
    * Set if component needs multiple instancing.
    */
    multiple: false,

    /**
    * Called once when component is attached. Generally for initial setup.
    */
    init: function () {
        this.loader = new THREE.FileLoader();
    },

    /**
    * Called when component is attached and when component data changes.
    * Generally modifies the entity based on the data.
    */

    update: function (oldData) {
        const data = this.data;

        if (data.dataPoints){
            this.loader.load(data.dataPoints, this.onDataLoaded.bind(this));
        }
    },

    /**
    * Called when a component is removed (e.g., via removeAttribute).
    * Generally undoes all modifications to the entity.
    */
    remove: function () { },

    /**
    * Called on each scene tick.
    */
    // tick: function (t) { },

    /**
    * Called when entity pauses.
    * Use to stop or remove any dynamic or background behavior such as events.
    */
    pause: function () { },

    /**
    * Called when entity resumes.
    * Use to continue or add any dynamic or background behavior such as events.
    */
    play: function () { },

    onDataLoaded: function (file) {
        let dataPoints = JSON.parse(file);
        const data = this.data;

        generateAxis(this.el);

        for (let point of dataPoints) {
            let entity;
            if(data.type === "bar"){
                entity = generateBar(point);
            }else if(data.type === "cylinder"){
                entity = generateCylinder(point);
            }else{
                entity = generateBubble(point);
            }

            entity.addEventListener('mouseenter', function () {
                this.setAttribute('scale', {x: 1.3, y: 1.3, z: 1.3});
            });
                entity.addEventListener('mouseleave', function () {
            this.setAttribute('scale', {x: 1, y: 1, z: 1});
            });

            this.el.appendChild(entity);
        }
    }
});

function generateBubble(point) {
    let entity = document.createElement('a-sphere');
    entity.setAttribute('position', {x: point['x'], y: point['y'], z: point['z']});
    entity.setAttribute('color', point['color']);
    entity.setAttribute('radius', point['size']);
    return entity;
}

function generateBar(point) {
    let entity = document.createElement('a-box');
    entity.setAttribute('position', {x: point['x'] + point['size']/2, y: point['y']/2, z: point['z']}); //centering graph
    entity.setAttribute('color', point['color']);
    entity.setAttribute('height', point['y']);
    entity.setAttribute('depth', point['size']);
    entity.setAttribute('width', point['size']);
    return entity;
}

function generateCylinder(point) {
    let entity = document.createElement('a-cylinder');
    entity.setAttribute('position', {x: point['x'] + point['size']/2, y: point['y']/2, z: point['z']}); //centering graph
    entity.setAttribute('color', point['color']);
    entity.setAttribute('height', point['y']);
    entity.setAttribute('radius', point['size'] / 2 );
    return entity;
}


function generateAxis(element) {
    for (let axis of ['x', 'y', 'z']) {

        let line_end = {x: 0, y: 0, z: 0};
        line_end[axis] = 10;

        let axis_line = document.createElement('a-entity');
        axis_line.setAttribute('line', {
            'start': {x: 0, y: 0, z: 0},
            'end':   line_end,
            'color': 'red'
        });

        for (let tick = 1; tick <= 10; tick++) {
            let tick_start;
            let tick_end;

            if (axis === 'x') {
                tick_start = {x: tick, y: -0.2, z: 0};
                tick_end   = {x: tick, y:  0.2, z: 0};
            }else if (axis === 'y') {
                tick_start = {x: 0, y: tick, z: -0.2};
                tick_end   = {x: 0, y: tick, z:  0.2};
            }else{
                tick_start = {x: -0.2, y: 0, z: tick};
                tick_end   = {x:  0.2, y: 0, z: tick};
            }

            axis_line.setAttribute('line__' + tick, {
                'start': tick_start,
                'end':   tick_end,
                'color': 'red'
            });
        }
        element.appendChild(axis_line);
    }
}

/***/ })
/******/ ]);