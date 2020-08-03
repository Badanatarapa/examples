import qql from 'graphql-tag';

/*
 * In this example we request a route from Amsterdam, Netherlands to Berlin, Germany
 * The changing conditions are:
 *   - full battery at Amsterdam, Germany
 *   - no desired range at Berlin, Germany
 *   - EV can charge at CHadMO changers
 *   - should use climate (temperature and weather conditions)
 *   - the EV driver can drive 40 km  less than the EV specs (specs is 440 km, custom range is 400 km)
 *   - min power of chargers is 43 kWh
 *   - one passenger in the car (drive alone)
 */
export const createRoute = routeId => {
  console.log({
    routeId,
    request: `mutation newRoute{
    newRoute(
      input: {
        ev: {
          id: "5d161be5c9eef46132d9d20a"
          battery: {
            capacity: { value: 999, type: km }
            stateOfCharge: { value: 999, type: km }
            finalStateOfCharge: { value: 40, type: km }
          }
          plugs: { chargingPower: 150, standard: TESLA_S }
          adapters: [
            { chargingPower: 150, standard: IEC_62196_T2_COMBO }
            { chargingPower: 150, standard: CHADEMO }
          ]
          climate: true
          minPower: 43
          numberOfPassengers: 1
        }
        ${routes[routeId || 0].routeRequest}
      }
    )
  }`,
  });
  return qql`
mutation newRoute{
    newRoute(
      input: {
        ev: {
          id: "5d161be5c9eef46132d9d20a"
          battery: {
            capacity: { value: 72.5, type: kwh }
            stateOfCharge: { value: 72.5, type: kwh }
            finalStateOfCharge: { value: 0, type: kwh }
          }
          plugs: { chargingPower: 150, standard: TESLA_S }
          adapters: [
            { chargingPower: 150, standard: IEC_62196_T2_COMBO }
            { chargingPower: 150, standard: CHADEMO }
          ]
          climate: true
          minPower: 43
          numberOfPassengers: 1
        }
        ${routes[routeId || 0].routeRequest}
      }
    )
  }
`;
};

export const routeUpdate = qql`
subscription routeUpdatedById($id: ID!){
  routeUpdatedById(id: $id) {
    status
    route {
      charges
      saving {
        money
        co2
      }
      chargeTime
      distance
      duration
      consumption
      elevationPlot
      elevationUp
      elevationDown
      id
      polyline
      legs{
        name
        distance
        chargeTime
        origin{
          geometry{
            type
            coordinates
          }
        }
        destination{
          geometry
          {
            type
            coordinates
          }
        }
      }
    }
  }
}
`;

export const routes = [
  {
    name: 'Amsterdam - Berlin',
    routeRequest: ` routeRequest: {
    origin: {
      type: Feature
      geometry: { type: Point, coordinates: [4.8951679, 52.3702157] }
      properties: { name: "Amsterdam, Netherlands" }

    }
    destination: {
      type: Feature
      geometry: { type: Point, coordinates: [13.3888599, 52.5170365] }
      properties: { name: "Berlin, Germany" }
    }
  }`,
  },
  {
    name: 'London - Camebridge',
    routeRequest: ` routeRequest: {
    origin: {
      type: Feature
      geometry: { type: Point, coordinates: [-0.127758, 51.507351] }
      properties: { name: "London, United Kingdom" }
    }
    destination: {
      type: Feature
      geometry: { type: Point, coordinates: [0.121817, 52.205338] }
      properties: { name: "Cambridge, United Kingdom" }
    }
  }`,
  },
  {
    name: 'Dusseldorf - Stuttgart',
    routeRequest: `routeRequest: {
    origin: {
      type: Feature
      geometry: { type: Point, coordinates: [6.773456, 51.227741] }
      properties: { name: "Dusseldorf, Germany" }
    }
    destination: {
      type: Feature
      geometry: { type: Point, coordinates: [9.182932, 48.775845] }
      properties: { name: "Stuttgart, Germany" }
    }
  }`,
  },
  {
    name: 'New York - Washington',
    routeRequest: `
  routeRequest: {
      origin: {
        type: Feature
        geometry: { type: Point, coordinates: [-73.938344, 40.684122] }
        properties: { name: "New York, USA" }
      }
      destination: {
        type: Feature
        geometry: { type: Point, coordinates: [ -77.000599, 38.884589] }
        properties: { name: "Washington, USA" }
      }
    }`,
  },
  {
    name: 'LA - Morro Bay',
    routeRequest: `
  routeRequest: {
      origin: {
        type: Feature
        geometry: { type: Point, coordinates: [-118.267563, 34.008777] }
        properties: { name: "Los Angeles, USA" }
      }
      destination: {
        type: Feature
        geometry: { type: Point, coordinates: [-120.847632, 35.361699] }
        properties: { name: "Morro Bay, USA" }
      }
    }`,
  },
  {
    name: 'Pine Creek - Reno',
    routeRequest: `
  routeRequest: {
      origin: {
        type: Feature
        geometry: { type: Point, coordinates: [-120.509145, 35.653926] }
        properties: { name: "Pine Creek, USA" }
      }
      destination: {
        type: Feature
        geometry: { type: Point, coordinates: [-119.769921, 39.527713] }
        properties: { name: "Reno, USA" }
      }
    }`,
  },
  {
    name: 'Oslo, Otta',
    routeRequest: `
  routeRequest: {
      origin: {
        type: Feature
        geometry: { type: Point, coordinates: [10.755246, 59.917077] }
        properties: { name: "Oslo, Norway" }
      }
      destination: {
        type: Feature
        geometry: { type: Point, coordinates: [9.539215, 61.773916] }
        properties: { name: "Otta, Norway" }
      }
    }`,
  },
];
