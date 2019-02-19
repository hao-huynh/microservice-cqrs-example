const db = require("./lib/db")();
const { CREATE } = require('./constant');
const { parseEvent } = require('./util/parseEvent');

module.exports.saveState = async (message) => {
  try {
    const event = parseEvent(message);
    console.log('save state', event);
    if (event.type !== CREATE) return;
    await db.save(process.env.STATE_TABLE, event.payload);
    console.log('save state success');
  } catch (err) {
    console.log('save state error', err);
  }
};
