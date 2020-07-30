export const trafficLayers = [
  {
    id: 'traffic-street-link-bg',
    type: 'line',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    source: 'mapbox://mapbox.mapbox-traffic-v1',
    'source-layer': 'traffic',
    minzoom: 15,
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['all', ['has', 'congestion'], ['in', 'class', 'link', 'motorway_link', 'service', 'street']],
    ],
    layout: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [14, 2.5],
          [20, 15.5],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(145, 95%, 30%)'],
          ['moderate', 'hsl(30, 100%, 42%)'],
          ['heavy', 'hsl(355, 100%, 37%)'],
          ['severe', 'hsl(355, 70%, 22%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [14, 2],
          [20, 18],
        ],
      },
      'line-opacity': {
        base: 1,
        stops: [
          [15, 0],
          [16, 1],
        ],
      },
    },
  },
  {
    id: 'traffic-secondary-tertiary-bg',
    type: 'line',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    source: 'mapbox://mapbox.mapbox-traffic-v1',
    'source-layer': 'traffic',
    minzoom: 6,
    filter: [
      'all',
      ['==', '$type', 'LineString'],
      ['all', ['has', 'congestion'], ['in', 'class', 'secondary', 'tertiary']],
    ],
    layout: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [9, 1.5],
          [18, 11],
          [20, 16.5],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(145, 95%, 30%)'],
          ['moderate', 'hsl(30, 100%, 42%)'],
          ['heavy', 'hsl(355, 100%, 37%)'],
          ['severe', 'hsl(355, 70%, 22%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [10, 0.5],
          [15, 5],
          [18, 11],
          [20, 14.5],
        ],
      },
      'line-opacity': {
        base: 1,
        stops: [
          [13, 0],
          [14, 1],
        ],
      },
    },
  },
  {
    id: 'traffic-primary-bg',
    type: 'line',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    source: 'mapbox://mapbox.mapbox-traffic-v1',
    'source-layer': 'traffic',
    minzoom: 6,
    filter: ['all', ['==', '$type', 'LineString'], ['all', ['==', 'class', 'primary'], ['has', 'congestion']]],
    layout: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [10, 0.75],
          [15, 6],
          [20, 18],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(145, 95%, 30%)'],
          ['moderate', 'hsl(30, 100%, 42%)'],
          ['heavy', 'hsl(355, 100%, 37%)'],
          ['severe', 'hsl(355, 70%, 22%)'],
        ],
      },
      'line-offset': {
        base: 1.2,
        stops: [
          [10, 0],
          [12, 1.5],
          [18, 13],
          [20, 16],
        ],
      },
      'line-opacity': {
        base: 1,
        stops: [
          [11, 0],
          [12, 1],
        ],
      },
    },
  },
  {
    id: 'traffic-trunk-bg',
    type: 'line',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    source: 'mapbox://mapbox.mapbox-traffic-v1',
    'source-layer': 'traffic',
    minzoom: 6,
    filter: ['all', ['==', '$type', 'LineString'], ['all', ['==', 'class', 'trunk'], ['has', 'congestion']]],
    layout: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [8, 0.5],
          [9, 2.25],
          [18, 13],
          [20, 17.5],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(145, 95%, 30%)'],
          ['moderate', 'hsl(30, 100%, 42%)'],
          ['heavy', 'hsl(355, 100%, 37%)'],
          ['severe', 'hsl(355, 70%, 22%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [7, 0],
          [9, 1],
          [18, 13],
          [20, 18],
        ],
      },
      'line-opacity': 1,
    },
  },
  {
    id: 'traffic-motorway-bg',
    type: 'line',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    source: 'mapbox://mapbox.mapbox-traffic-v1',
    'source-layer': 'traffic',
    minzoom: 6,
    filter: ['all', ['==', '$type', 'LineString'], ['all', ['==', 'class', 'motorway'], ['has', 'congestion']]],
    layout: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [6, 0.5],
          [9, 3],
          [18, 16],
          [20, 20],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(145, 95%, 30%)'],
          ['moderate', 'hsl(30, 100%, 42%)'],
          ['heavy', 'hsl(355, 100%, 37%)'],
          ['severe', 'hsl(355, 70%, 22%)'],
        ],
      },
      'line-opacity': 1,
      'line-offset': {
        base: 1.5,
        stops: [
          [7, 0],
          [9, 1.2],
          [11, 1.2],
          [18, 10],
          [20, 15.5],
        ],
      },
    },
  },
  {
    id: 'traffic-primary',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    ref: 'traffic-primary-bg',
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [10, 1],
          [15, 4],
          [20, 16],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(142, 55%, 50%)'],
          ['moderate', 'hsl(30, 100%, 55%)'],
          ['heavy', 'hsl(355, 100%, 50%)'],
          ['severe', 'hsl(355, 70%, 35%)'],
        ],
      },
      'line-offset': {
        base: 1.2,
        stops: [
          [10, 0],
          [12, 1.5],
          [18, 13],
          [20, 16],
        ],
      },
      'line-opacity': 1,
    },
  },
  {
    id: 'traffic-secondary-tertiary',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    ref: 'traffic-secondary-tertiary-bg',
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [9, 0.5],
          [18, 9],
          [20, 14],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(142, 55%, 50%)'],
          ['moderate', 'hsl(30, 100%, 55%)'],
          ['heavy', 'hsl(355, 100%, 50%)'],
          ['severe', 'hsl(355, 70%, 35%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [10, 0.5],
          [15, 5],
          [18, 11],
          [20, 14.5],
        ],
      },
      'line-opacity': 1,
    },
  },
  {
    id: 'traffic-street-link',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    ref: 'traffic-street-link-bg',
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [14, 1.5],
          [20, 13.5],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(142, 55%, 50%)'],
          ['moderate', 'hsl(30, 100%, 55%)'],
          ['heavy', 'hsl(355, 100%, 50%)'],
          ['severe', 'hsl(355, 70%, 35%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [14, 2],
          [20, 18],
        ],
      },
      'line-opacity': 1,
    },
  },
  {
    id: 'traffic-trunk',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    ref: 'traffic-trunk-bg',
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [8, 0.75],
          [18, 11],
          [20, 15],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(142, 55%, 50%)'],
          ['moderate', 'hsl(30, 100%, 55%)'],
          ['heavy', 'hsl(355, 100%, 50%)'],
          ['severe', 'hsl(355, 70%, 35%)'],
        ],
      },
      'line-offset': {
        base: 1.5,
        stops: [
          [7, 0],
          [9, 1],
          [18, 13],
          [20, 18],
        ],
      },
      'line-opacity': 1,
    },
  },
  {
    id: 'traffic-motorway',
    metadata: {
      'mapbox:group': '4053de47c16e55481b10fd748eaa994c',
    },
    ref: 'traffic-motorway-bg',
    paint: {
      'line-width': {
        base: 1.5,
        stops: [
          [6, 0.5],
          [9, 1.5],
          [18, 14],
          [20, 18],
        ],
      },
      'line-color': {
        base: 1,
        type: 'categorical',
        property: 'congestion',
        stops: [
          ['low', 'hsl(142, 55%, 50%)'],
          ['moderate', 'hsl(30, 100%, 55%)'],
          ['heavy', 'hsl(355, 100%, 50%)'],
          ['severe', 'hsl(355, 70%, 35%)'],
        ],
      },
      'line-opacity': 1,
      'line-offset': {
        base: 1.5,
        stops: [
          [7, 0],
          [9, 1.2],
          [11, 1.2],
          [18, 10],
          [20, 15.5],
        ],
      },
    },
  },
];
