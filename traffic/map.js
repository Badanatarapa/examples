import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmdldHJpcCIsImEiOiJjamo3em4wdnUwdHVlM3Z0ZTNrZmd1MXoxIn0.aFteYnUc_GxwjTLGvB3uCg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  zoom: 6.4,
  center: [8.2, 52],
  trafficSource: /mapbox-traffic-v\d/,
});

/**
 * Draw route polyline and show the point of origin and destination on the map.
 *
 * @param coordinates {array} Array of coordinates.
 * @param legs {array} route legs (stops) - each leg represents either a charging station, or via point or final point.
 */
export const drawRoute = (id, coordinates, legs) => {
  if (map.loaded()) {
    drawPolyline(coordinates);
    showLegs(legs);
  } else {
    map.on('load', () => {
      drawPolyline(coordinates);
      showLegs(legs);
    });
  }
};

const showLegs = legs => {
  // create a HTML element for each feature
  const origin = document.createElement('div');
  origin.className = 'origin';
  const destination = document.createElement('div');
  destination.className = 'destination';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(origin).setLngLat(legs[0].origin.geometry.coordinates).addTo(map);
  new mapboxgl.Marker(destination).setLngLat(legs[legs.length - 1].destination?.geometry.coordinates).addTo(map);
};

/**
 * Draw route polyline on a map.
 *
 * @param coordinates {array} polyline coordinates
 */
const drawPolyline = coordinates => {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          properties: {},
          coordinates,
        },
      },
    ],
  };

  map.addSource('polyline-source', {
    type: 'geojson',
    lineMetrics: true,
    data: geojson,
  });

  map.addLayer({
    id: 'polyline',
    type: 'line',
    options: 'beforeLayer',
    source: 'polyline-source',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': 'red',
      'line-width': 6,
      // 'line-gradient' must be specified using an expression
      // with the special 'line-progress' property
      'line-gradient': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0,
        'blue',
        0.1,
        'royalblue',
        0.3,
        'cyan',
        0.5,
        'lime',
        0.7,
        'yellow',
        1,
        'red',
      ],
    },
  });
};
