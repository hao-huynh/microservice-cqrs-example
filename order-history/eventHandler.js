const db = require('./lib/db')();
const { CREATE_ORDER, CREATE_PAYMENT } = require('./constant');
const { parseEvent } = require('./util/parseEvent');

const STATE_TABLE = process.env.STATE_TABLE;
module.exports.persistOrder = async (message) => {
  try {
    const event = parseEvent(message);
    console.log('save order', event);
    if (event.type !== CREATE_ORDER) return;
    await db.save(process.env.STATE_TABLE, event.payload);
    console.log('save order success');
  } catch (err) {
    console.log('save order error', err);
  }
};


module.exports.persistPayment = async (message) => {
  try {
    const event = parseEvent(message);
    console.log('save payment', event);
    if (event.type !== CREATE_PAYMENT) return;
    const payment = event.payload || {};
    const params = {
      TableName: STATE_TABLE,
      Key:{
        id: payment.orderId
      },
      UpdateExpression: 'set paymentStatus = :s',
      ExpressionAttributeValues:{
        ':s': payment.status
      },
      ReturnValues: 'UPDATED_NEW'
    };

    await db.update(params);
    console.log('save payment success');
  } catch (err) {
    console.log('save payment error', err);
  }
};
