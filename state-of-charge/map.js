import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmdldHJpcCIsImEiOiJjazhpaG8ydTIwNWNpM21ud29xeXc2amhlIn0.rGKgR3JfG9Z5dCWjUI_oGA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/chargetrip/ckgcbf3kz0h8819qki8uwhe0k',
  zoom: 6,
  center: [8.1320104, 52.3758916],
});

// Display the charge time on a hover
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

map.on('mouseenter', 'legs', e => {
  if (e.features[0]?.properties?.icon !== 'arrival' && e.features[0]?.properties?.icon !== 'location_big') {
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0]?.geometry?.coordinates;
    const description = `Expected state of charge at arrival ${(e.features[0]?.properties?.description / 1000).toFixed(
      0,
    )} km`;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  }
});

map.on('mouseleave', 'legs', function() {
  map.getCanvas().style.cursor = '';
  popup.remove();
});

/**
 * Draw route polyline and show charging stations on the map.
 *
 * @param coordinates {array} Array of coordinates
 * @param legs {array} route legs (stops) - each leg represents either a charging station, or via point or final point
 */
export const drawRoute = (coordinates, legs) => {
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

/**
 * Draw route polyline on a map.
 *
 * @param coordinates {array} polyline coordinates
 */
const drawPolyline = coordinates => {
  if (map.getLayer('polyline')) map.removeLayer('polyline');
  if (map.getSource('polyline-source')) map.removeSource('polyline-source');
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
      'line-color': '#0078FF',
      'line-width': 3,
    },
  });
};

/**
 * Show the charging station, origin and destination on the map.
 *
 * The origin of the first leg is the start of your route.
 * The destination of the last is the destination of your route.
 * The desitinatation of all other legs are charging stations or via points.
 *
 * @param legs {array} route legs
 */
const showLegs = legs => {
  if (map.getLayer('legs')) map.removeLayer('legs');
  if (map.getSource('legs')) map.removeSource('legs');
  if (legs.length === 0) return;

  let points = [];

  // we want to show origin point on the map
  // to do that we use the origin of the first leg
  points.push({
    type: 'Feature',
    properties: {
      description: legs[0].rangeStart,
      icon: 'location_big',
    },
    geometry: legs[0].origin?.geometry,
  });

  for (let i = 0; i < legs.length; i++) {
    // add charging stations
    if (i !== legs.length - 1) {
      points.push({
        type: 'Feature',
        properties: {
          description: legs[i].rangeEnd,
          icon: 'unknown-turbo',
        },
        geometry: legs[i].destination?.geometry,
      });
    } else {
      // add destination point (last leg)
      points.push({
        type: 'Feature',
        properties: {
          icon: 'arrival',
          description: legs[i].rangeEnd,
        },
        geometry: legs[i].destination?.geometry,
      });
    }
  }

  // draw route points on a map
  map.addLayer({
    id: 'legs',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-allow-overlap': true,
      'icon-offset': ['case', ['==', ['get', 'icon'], 'location_big'], ['literal', [0, 0]], ['literal', [0, -15]]],
    },
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: points,
      },
    },
  });
};
