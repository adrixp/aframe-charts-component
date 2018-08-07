/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A-Charts component for A-Frame.
 */
AFRAME.registerComponent('charts', {
    schema: {
        size: {type: 'number', default: 1},
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
      var dataPoints = JSON.parse(file);

      for (let point of dataPoints) {
          var entity = document.createElement('a-sphere');
          entity.setAttribute('position', {x: point['x'], y: point['y'], z: point['z']});
          entity.setAttribute('color', point['color']);
          entity.setAttribute('radius', point['size']);

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
