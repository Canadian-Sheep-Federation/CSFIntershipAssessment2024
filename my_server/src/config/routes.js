const routes = {
  "GET /records/:id": "RecordController.getRecord",
  "GET /records": "RecordController.getRecords",
  "POST /records": "RecordController.writeRecord",
};

module.exports = routes;
