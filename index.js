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
        axis_visible:         {type: 'boolean', default: true},
        axis_position:        {type: 'vec3', default: {x:0, y:0, z:0}},
        axis_color:           {type: 'string', default: 'red'},
        axis_length:          {type: 'number', default: 0},
        axis_tick_separation: {type: 'number', default: 1},
        axis_tick_length:     {type: 'number', default: 0.2},
        axis_tick_color:      {type: 'string', default: 'red'},
        axis_negative:        {type: 'boolean', default: true},
        axis_grid:            {type: 'boolean', default: false},
        axis_grid_3D:         {type: 'boolean', default: false},
        axis_text:            {type: 'boolean', default: true},
        axis_text_color:      {type: 'string', default: 'white'},
        axis_text_size:       {type: 'number', default: 10},
        pie_radius:           {type: 'number', default: 1},
        pie_doughnut:         {type: 'boolean', default: false},
        show_data_point_info: {type: 'boolean', default: false}
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
        let dataPoints;
        try{
            dataPoints = JSON.parse(file);
        }catch(e) {
            throw new Error('Can\'t parse JSON file. Maybe is not a valid JSON file');
        }

        const properties = this.data;

        //Axis generation
        if(properties.axis_visible || properties.type !== "pie"){
            if(properties.axis_length === 0){
                let adaptive_props = getAdaptiveAxisProperties(dataPoints);
                properties.axis_length = adaptive_props.max;
                if(properties.axis_negative)
                    properties.axis_negative = adaptive_props.has_negative;
            }

            if(properties.axis_grid || properties.axis_grid_3D){
                generateGridAxis(this.el, properties);
            }else{
                generateAxis(this.el, properties);
            }
        }

        //Chart generation
        let pie_angle_start = 0;
        let pie_angle_end = 0;
        let pie_total_value = 0;

        if(properties.type === "pie"){
            for (let point of dataPoints) {
                pie_total_value += point['size'];
            }
        }

        let element = this.el;
        let popUp;

        for (let point of dataPoints) {
            let entity;
            if(properties.type === "bar"){
                entity = generateBar(point);
            }else if(properties.type === "cylinder"){
                entity = generateCylinder(point);
            }else if(properties.type === "pie"){
                pie_angle_end = 360 * point['size'] / pie_total_value;
                if(properties.pie_doughnut){
                    entity = generateDoughnutSlice(point, pie_angle_start, pie_angle_end, properties.pie_radius);
                }else{
                    entity = generateSlice(point, pie_angle_start, pie_angle_end, properties.pie_radius);
                }
                pie_angle_start += pie_angle_end;
            }else{
                entity = generateBubble(point);
            }

            let show_data_condition = properties.show_data_point_info && properties.type !== "pie" && !properties.pie_doughnut;

            entity.addEventListener('mouseenter', function () {
                this.setAttribute('scale', {x: 1.3, y: 1.3, z: 1.3});
                if(show_data_condition){
                    popUp = generatePopUp(point, properties);
                    element.appendChild(popUp);
                }
            });
            entity.addEventListener('mouseleave', function () {
                this.setAttribute('scale', {x: 1, y: 1, z: 1});
                if(show_data_condition){
                    element.removeChild(popUp);
                }
            });

            element.appendChild(entity);
        }
    }
});

function generatePopUp(point, properties) {
    let correction = 0;
    if(properties.type === "bar" || properties.type === "bar")
        correction = point['size']/2;

    let entity = document.createElement('a-plane');
    entity.setAttribute('position', {x: point['x'] + correction, y: point['y'] + point['size']*2 , z: point['z']});
    entity.setAttribute('height', '2');
    entity.setAttribute('width', '2');
    entity.setAttribute('color', 'white');
    entity.setAttribute('text', {
        'value': 'DataPoint:\n"x":' + point['x'] + ',\n"y":' + point['y'] + ',\n"z":' + point['z'] + ',\n"size":' + point['size'],
        'align': 'center',
        'width': 6,
        'color': 'black'
    });
    entity.setAttribute('light', {
        'intensity': 0.3
    });
    return entity;
}

function generateSlice(point, theta_start, theta_length, radius) {
    let entity = document.createElement('a-cylinder');
    entity.setAttribute('color', point['color']);
    entity.setAttribute('theta-start', theta_start);
    entity.setAttribute('theta-length', theta_length);
    entity.setAttribute('side', 'double');
    entity.setAttribute('radius', radius);
    return entity;
}

function generateDoughnutSlice(point, position_start, arc, radius) {
    let entity = document.createElement('a-torus');
    entity.setAttribute('color', point['color']);
    entity.setAttribute('rotation', {x: 0, y: 0, z: position_start});
    entity.setAttribute('arc', arc);
    entity.setAttribute('side', 'double');
    entity.setAttribute('radius', radius);
    entity.setAttribute('radius-tubular', radius/4);
    return entity;
}

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

    let axis_text = properties.axis_text;
    let axis_text_color = properties.axis_text_color;
    let axis_text_size = properties.axis_text_size;

    for (let axis of ['x', 'y', 'z']) {

        let line_end = {x: axis_position.x, y: axis_position.y, z: axis_position.z};
        line_end[axis] = axis_length + axis_position[axis];

        let line_start = {x: axis_position.x, y: axis_position.y, z: axis_position.z};

        if (axis_negative){
            axis_negative_offset = axis_length + 1;
            line_start[axis] = -axis_length + axis_position[axis];
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


            if(axis_text){
                let axis_text = document.createElement('a-text');
                axis_text.setAttribute('position', tick_start);

                if (axis === 'x') {
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 5
                    });
                }else if (axis === 'y') {
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 4
                    });
                }else{
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 4.5
                    });
                }

                element.appendChild(axis_text);
            }

        }
        element.appendChild(axis_line);
    }
}

function generateGridAxis(element, properties) {
    let axis_length = properties.axis_length;
    let axis_position = properties.axis_position;
    let axis_color = properties.axis_color;

    let axis_negative = properties.axis_negative;
    let axis_negative_offset = 0;
    let axis_negative_limit = 0;
    let axis_grid_3D = properties.axis_grid_3D;

    let axis_text = properties.axis_text;
    let axis_text_color = properties.axis_text_color;
    let axis_text_size = properties.axis_text_size;

    for (let axis of ['x', 'y', 'z']) {

        let line_end = {x: axis_position.x, y: axis_position.y, z: axis_position.z};
        line_end[axis] = axis_length + axis_position[axis];

        let line_start = {x: axis_position.x, y: axis_position.y, z: axis_position.z};

        if (axis_negative){
            axis_negative_offset = axis_length;
            axis_negative_limit = axis_length + 1;
            line_start[axis] = - axis_length + axis_position[axis];
        }

        let axis_line = document.createElement('a-entity');
        axis_line.setAttribute('line', {
            'start': line_start,
            'end':   line_end,
            'color': axis_color
        });

        for (let tick = 1 - axis_negative_limit; tick <= axis_length; tick ++) {
            let tick_start;
            let tick_end;
            let grid_start;
            let grid_end;

            if (axis === 'x') {
                tick_start = {x: axis_position.x + tick,                  y: axis_position.y - axis_negative_offset,  z: axis_position.z};
                tick_end   = {x: axis_position.x + tick,                  y: axis_position.y + axis_length,           z: axis_position.z};
                grid_start = {x: axis_position.x + tick,                  y: axis_position.y,                         z: axis_position.z - axis_negative_offset};
                grid_end   = {x: axis_position.x + tick,                  y: axis_position.y,                         z: axis_position.z + axis_length};
            }else if (axis === 'y') {
                tick_start = {x: axis_position.x,                         y: axis_position.y + tick,                  z: axis_position.z - axis_negative_offset};
                tick_end   = {x: axis_position.x,                         y: axis_position.y + tick,                  z: axis_position.z + axis_length};
                grid_start = {x: axis_position.x - axis_negative_offset,  y: axis_position.y + tick,                  z: axis_position.z};
                grid_end   = {x: axis_position.x + axis_length,           y: axis_position.y + tick,                  z: axis_position.z};
            }else{
                tick_start = {x: axis_position.x - axis_negative_offset,  y: axis_position.y,                         z: axis_position.z + tick};
                tick_end   = {x: axis_position.x + axis_length,           y: axis_position.y,                         z: axis_position.z + tick};
                grid_start = {x: axis_position.x,                         y: axis_position.y - axis_negative_offset,  z: axis_position.z + tick};
                grid_end   = {x: axis_position.x,                         y: axis_position.y + axis_length,           z: axis_position.z + tick};
            }

            if(axis_text){
                let axis_text = document.createElement('a-text');
                axis_text.setAttribute('position', tick_end);

                if (axis === 'x') {
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 5
                    });
                }else if (axis === 'y') {
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 4
                    });
                }else{
                    axis_text.setAttribute('text__' + tick, {
                        'value': Math.round(tick * 100) / 100,
                        'width': axis_text_size,
                        'color': axis_text_color,
                        'xOffset': 4.5
                    });
                }

                element.appendChild(axis_text);
            }

            axis_line.setAttribute('line__' + tick, {
                'start': tick_start,
                'end':   tick_end,
                'color': axis_color
            });

            axis_line.setAttribute('line__' + tick + axis_length, {
                'start': grid_start,
                'end':   grid_end,
                'color': axis_color
            });

            if(axis_grid_3D){
                for (let grid = 1 - axis_negative_offset; grid <= axis_length; grid ++) {
                    let sub_grid_start;
                    let sub_grid_end;

                    if (axis === 'x') {
                        sub_grid_start = {x: axis_position.x + tick,                  y: axis_position.y - axis_negative_offset,  z: axis_position.z + grid};
                        sub_grid_end   = {x: axis_position.x + tick,                  y: axis_position.y + axis_length,           z: axis_position.z + grid};
                    }else if (axis === 'y') {
                        sub_grid_start = {x: axis_position.x + grid,                  y: axis_position.y + tick,                  z: axis_position.z - axis_negative_offset};
                        sub_grid_end   = {x: axis_position.x + grid,                  y: axis_position.y + tick,                  z: axis_position.z + axis_length};
                    }else{
                        sub_grid_start = {x: axis_position.x - axis_negative_offset,  y: axis_position.y + grid,                  z: axis_position.z + tick};
                        sub_grid_end   = {x: axis_position.x + axis_length,           y: axis_position.y + grid,                  z: axis_position.z + tick};
                    }

                    axis_line.setAttribute('line__' + tick + grid + axis_length, {
                        'start': sub_grid_start,
                        'end':   sub_grid_end,
                        'color': axis_color
                    });
                }
            }

        }
        element.appendChild(axis_line);
    }
}

function getAdaptiveAxisProperties(dataPoints) {
    let max = 0;
    let has_negative = false;

    for (let point of dataPoints) {
        if(point.x < 0 || point.y < 0 || point.z < 0)
            has_negative = true;

        let point_x = Math.abs(point.x);
        let point_y = Math.abs(point.y);
        let point_z = Math.abs(point.z);

        if( point_x > max)
            max = point_x;
        if( point_y > max)
            max = point_y;
        if( point_z > max)
            max = point_z;
    }

    return {max: max, has_negative: has_negative};
}