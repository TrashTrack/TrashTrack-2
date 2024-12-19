const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'TrashTrack',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

