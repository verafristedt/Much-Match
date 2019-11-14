import {BackendApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

import * as datasourceDb from './datasources/db.datasource.config.json';

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

export {BackendApplication};

export async function main(options: ApplicationConfig = {}) {
  // Set the port assined for the app
  if (!options) options = {};
  if (!options.rest) options.rest = {};
  options.rest.port = appEnv.isLocal ? options.rest.port : appEnv.port;
  options.rest.host = appEnv.isLocal ? options.rest.host : appEnv.host;

  const app = new BackendApplication(options);

  // If running on IBM Cloud, we get the Cloudant service details from VCAP_SERVICES
  if (!appEnv.isLocal) {
    // 'myCloudant' is the name of the provisioned Cloudant service
    const updatedDatasourceDb = Object.assign({}, datasourceDb, {
      url: appEnv.getServiceURL('MuchMach-DB'),
    });
    console.log('cf', updatedDatasourceDb);
    app.bind('datasources.config.Db').to(updatedDatasourceDb);
  } else {
    console.log('using local conf');
  }

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
