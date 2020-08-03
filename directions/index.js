import { createClient, createRequest, defaultExchanges, subscriptionExchange } from '@urql/core';
import { pipe, subscribe } from 'wonka';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createRoute, routeUpdate, routes } from './queries.js';
import { drawRoute } from './map.js';
import * as mapboxPolyline from '@mapbox/polyline';
import { createInstructions } from './directions';

/**
 * Example application of how to build a route + directions with the Chargetrip API.
 * Please have a look to Readme file in this repo for more details.
 *
 * For the purpose of this example we use urgl - lightweights GraphQL client.
 * To establish a connection with Chargetrip GraphQL API you need to have an API key.
 * The key in this example is a public one and gives access only to a part of our extensive database.
 * You need a registered `x-client-id` to access the full database.
 * Read more about an authorisation in our documentation (https://docs.chargetrip.com/#authorisation).
 */
const headers = {
  'x-client-id': '5e8c22366f9c5f23ab0eff39',
};

const subscriptionClient = new SubscriptionClient('wss://api.chargetrip.io/graphql', {
  reconnect: true,
  connectionParams: headers,
});

const client = createClient({
  url: 'https://api.chargetrip.io/graphql',
  fetchOptions: {
    method: 'POST',
    headers,
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

/**
 * To create a route you need:
 *
 * 1. Create a new route and receive back its ID;
 * 2. Subscribe to route updates in order to receive its details.
 */
client
  .mutation(createRoute(new URLSearchParams(window.location.search).get('route')))
  .toPromise()
  .then(response => {
    const routeId = response.data.newRoute;
    if (!routeId) return Promise.reject('Could not retrieve Route ID. The response is not valid.');

    const { unsubscribe } = pipe(
      client.executeSubscription(createRequest(routeUpdate, { id: routeId })),
      subscribe(result => {
        const { status, route } = result.data.routeUpdatedById;

        // you can keep listening to the route changes to update route information
        // for this example we want to only draw the initial route
        if (status === 'done' && route) {
          unsubscribe();

          console.log('CT route distance', route.distance);

          drawRoutePolyline(route); // draw a polyline on a map
          displayRouteData(route); // fill in the route information
          createInstructions(route); // create directions and add to the map
        }
      }),
    );
  })
  .catch(error => console.log('Error creating route', error));

/**
 * Draw a route on a map.
 *
 * Route object contains `polyline` data -  the polyline encoded route (series of coordinates as a single string).
 * We need to decode this information first. We use Mapbox polyline tool (https://www.npmjs.com/package/@mapbox/polyline) for this.
 * As a result of decoding we get pairs [latitude, longitude].
 * To draw a route on a map we use Mapbox GL JS. This tool uses the format [longitude,latitude],
 * so we have to reverse every pair.
 *
 * @param data {object} route specification
 */
const drawRoutePolyline = data => {
  const decodedData = mapboxPolyline.decode(data.polyline);
  const reversed = decodedData.map(item => item.reverse());

  drawRoute(reversed, data.legs);
};

/**
 * Show journey specific information like duration, consumption, costs etc.
 *
 * @param data {object} route specification
 */
const displayRouteData = () => {
  document.getElementById('loader').remove();
  document.querySelector('.tags').style.display = 'flex';
};

// Add event listeners for 'click' on the tabs.
document.querySelector('.car-details-button').addEventListener('click', () => {
  const carTab = document.getElementById('car-tab');
  const turnByTurnTab = document.getElementById('directions-tab');
  document.querySelector('.turn-by-turn-button').classList.remove('focused');
  document.querySelector('.car-details-button').classList.add('focused');
  turnByTurnTab.style.display = 'none';
  carTab.style.display = 'block';
});
document.querySelector('.turn-by-turn-button').addEventListener('click', () => {
  const carTab = document.getElementById('car-tab');
  const turnByTurnTab = document.getElementById('directions-tab');
  document.querySelector('.car-details-button').classList.remove('focused');
  document.querySelector('.turn-by-turn-button').classList.add('focused');
  turnByTurnTab.style.display = 'block';
  carTab.style.display = 'none';
});

const carTab = document.querySelector('.car-tab');

carTab.innerHTML = routes
  .map((item, index) => {
    return `<li><a href=?route=${index}>Route ${item.name}</a></li>`;
  })
  .join(' ');
