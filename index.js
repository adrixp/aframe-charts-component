/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A-Charts component for A-Frame.
 */
AFRAME.registerComponent('charts', {
    schema: {
        type:                 {type: 'string', default: 'bubble'},
        dataPoints:           {type: 'asset'},
        axis_position:        {type: 'vec3', default: {x:0, y:0, z:0}},
        axis_color:           {type: 'string', default: 'red'},
        axis_length:          {type: 'number', default: 10},
        axis_grid:            {type: 'boolean', default: false},
        axis_negative:        {type: 'boolean', default: false},
        axis_tick_separation: {type: 'number', default: 1},
        axis_tick_length:     {type: 'number', default: 0.2},
        axis_tick_color:      {type: 'string', default: 'red'}
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
        const properties = this.data;

        generateAxis(this.el, properties);

        for (let point of dataPoints) {
            let entity;
            if(properties.type === "bar"){
                entity = generateBar(point);
            }else if(properties.type === "cylinder"){
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


function generateAxis(element, properties) {
    let axis_length = properties.axis_length;
    let axis_position = properties.axis_position;
    let axis_color = properties.axis_color;

    let tick_separation = properties.axis_tick_separation;
    let tick_length = properties.axis_tick_length;
    let tick_color = properties.axis_tick_color;

    let axis_negative = properties.axis_negative;
    let axis_negative_offset = 0;

    for (let axis of ['x', 'y', 'z']) {

        let line_end = {x: axis_position.x, y: axis_position.y, z: axis_position.z};
        line_end[axis] = axis_length;

        let line_start = {x: axis_position.x, y: axis_position.y, z: axis_position.z};

        if (axis_negative){
            axis_negative_offset = axis_length + 1;
            line_start[axis] = -axis_length;
        }

        let axis_line = document.createElement('a-entity');
        axis_line.setAttribute('line', {
            'start': line_start,
            'end':   line_end,
            'color': axis_color
        });

        for (let tick = tick_separation - axis_negative_offset; tick <= axis_length; tick += tick_separation) {
            let tick_start;
            let tick_end;

            if (axis === 'x') {
                tick_start = {x: axis_position.x + tick,         y: axis_position.y - tick_length,  z: axis_position.z};
                tick_end   = {x: axis_position.x + tick,         y: axis_position.y + tick_length,  z: axis_position.z};
            }else if (axis === 'y') {
                tick_start = {x: axis_position.x,                y: axis_position.y + tick,         z: axis_position.z - tick_length};
                tick_end   = {x: axis_position.x,                y: axis_position.y + tick,         z: axis_position.z + tick_length};
            }else{
                tick_start = {x: axis_position.x - tick_length,  y: axis_position.y,                z: axis_position.z + tick};
                tick_end   = {x: axis_position.x + tick_length,  y: axis_position.y,                z: axis_position.z + tick};
            }

            axis_line.setAttribute('line__' + tick, {
                'start': tick_start,
                'end':   tick_end,
                'color': tick_color
            });
        }
        element.appendChild(axis_line);
    }
}