import mapboxgl from 'mapbox-gl';
import { trafficLayers } from './traffic-layer';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmdldHJpcCIsImEiOiJjamo3em4wdnUwdHVlM3Z0ZTNrZmd1MXoxIn0.aFteYnUc_GxwjTLGvB3uCg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/chargetrip/ck98fwwp159v71ip7xhs8bwts',
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
    addLayers();
  } else {
    map.on('load', () => {
      drawPolyline(coordinates);
      showLegs(legs);
      addLayers();
    });
  }
};

const addLayers = () => {
  map.addSource('mapbox://mapbox.mapbox-traffic-v1', {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-traffic-v1',
  });
  trafficLayers.map(item => {
    map.addLayer(item);
  });
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
      'line-color': '#0078FF',
      'line-width': 6,
    },
  });
};

/**
 * Show the origin and destination on the map.
 *
 * The destination of the last leg is the destination point.
 * The origin of the first leg is the origin of our route.
 *
 * @param legs {array} route legs (stops) - each leg represents either a charging station, or via point or final point
 */
const showLegs = legs => {
  if (!legs || legs.length === 0) return;
  let route = [];

  route.push({
    type: 'Feature',
    properties: {
      icon: 'location_big',
    },
    geometry: legs[0].origin?.geometry,
  });

  route.push({
    type: 'Feature',
    properties: {
      icon: 'arrival',
    },
    geometry: legs[legs.length - 1].destination?.geometry,
  });

  // draw origin and destination points on a map
  map.addLayer({
    id: 'route',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-allow-overlap': true,
      'icon-size': 0.9,
      'icon-offset': ['case', ['==', ['get', 'icon'], 'arrival'], ['literal', [0, -15]], ['literal', [0, 0]]],
    },
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: route,
      },
    },
  });
};
