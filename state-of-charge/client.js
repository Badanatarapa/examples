import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient, createRequest, defaultExchanges, subscriptionExchange } from '@urql/core';
import { createRoute, routeUpdate, queryRoute } from './queries';
import { pipe, subscribe } from 'wonka';

/**
 * For the purpose of this example we use urgl - lightweights GraphQL client.
 * To establish a connection with Chargetrip GraphQL API you need to have an API key.
 * The key in this example is a public one and gives access only to a part of our extensive database.
 * You need a registered `x-client-id` to access the full database.
 * Read more about authorisation in our documentation (https://docs.chargetrip.com/#authorisation).
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

/*
 * To create a route you need to:
 *
 * 1. create a new route and receive back its ID;
 * 2. subscribe to route updates in order to receive its details.
 */

export const fetchRoute = (soc, callback) => {
  client
    .mutation(createRoute(soc))
    .toPromise()
    .then(response => {
      const routeId = response.data.newRoute;

      const { unsubscribe } = pipe(
        client.executeSubscription(createRequest(routeUpdate, { id: routeId })),
        subscribe(result => {
          const { status, route } = result.data?.routeUpdatedById;
          // You can keep listening to the route changes to update route information.
          // For this example we want to only draw the initial route.
          if (status === 'done' && route) {
            unsubscribe();
            callback(route);
          }
        }),
      );

      // Query for the route once to check if the route is computed before the subscription was setup.
      // In this case we use the response from the query and unsubscribe from the route.
      // For more informations about routes: https://docs.chargetrip.com/#routes
      client
        .query(queryRoute, { id: routeId })
        .toPromise()
        .then(result => {
          const { status, route } = result.data.route;
          if (status === 'done' && route) {
            unsubscribe();
            callback(routeId, route);
          }
        });
    })
    .catch(error => console.log(error));
};
