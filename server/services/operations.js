const operationData = require('../data/operations');

exports.createOperation = (data) => {
   return operationData.createOperation(data);
};

exports.deleteOperation = (id) => {
   return operationData.deleteOperation(id);
};
