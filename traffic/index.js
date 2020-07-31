import { drawRoute } from './map.js';
import * as mapboxPolyline from '@mapbox/polyline';
import { fetchRoute } from './client';

/**
 * Draw a route on a map.
 *
 * The route object contains `polyline` data -  the polyline encoded route (series of coordinates as a single string).
 * We need to decode this information first. We use Mapbox polyline tool (https://www.npmjs.com/package/@mapbox/polyline) for this.
 * As a result of decoding we get pairs [latitude, longitude].
 * To draw a route on a map we use Mapbox GL JS. This tool uses the format [longitude,latitude],
 * so we have to reverse every pair.
 *
 * @param data {object} route specification.
 * @param id {string} route ID.
 */
fetchRoute((routeId, routeData) => {
  drawRoutePolyline(routeId, routeData);
});

const drawRoutePolyline = (id, data) => {
  const decodedData = mapboxPolyline.decode(data?.polyline);
  const reversed = decodedData.map(item => item.reverse());

  drawRoute(id, reversed, data?.legs);
};