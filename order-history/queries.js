const db = require("./lib/db")();
const { withStatusCode } = require('./util/response');
const ok = withStatusCode(200);

const STATE_TABLE = process.env.STATE_TABLE;

module.exports.all = async () => {
  const data = await db.all(STATE_TABLE);
  console.log(data);
  return ok(data);
};
