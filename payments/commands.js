const uuid = require('uuid');
const db = require("./lib/db")();
const bus = require("./lib/bus")();
const { CREATE} = require('./constant');
const { withStatusCode } = require('./util/response');
const ok = withStatusCode(200);

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);

  let generatedId = uuid.v1();
  const time = new Date().getTime();
  const createEvent = {
    type: CREATE,
    timestamp: time,
    id: generatedId,
    payload: {
      id: generatedId,
      orderId: data.orderId,
      status: data.status
    }
  };
  await db.save(process.env.EVENTS_TABLE, createEvent);
  await bus.publish(createEvent);
  return ok(createEvent);
};
