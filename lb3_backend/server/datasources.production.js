const vcap_services = JSON.parse(process.env.VCAP_SERVICES);
const cloudant = vcap_services.cloudantNoSQLDB[0].credentials;

module.exports = {
  db: {
    connector: 'cloudant',
    hostname: cloudant.host || 'localhost',
    port: cloudant.port || 443,
    username: cloudant.username,
    password: cloudant.password,
    database: 'muchmatch-new',
  }
};
