const AWS = require("aws-sdk");
const IS_OFFLINE = eval(process.env.IS_OFFLINE);
const REGION = process.env.SERVERLESS_REGION;

AWS.config.update({ region: REGION });

const createDynamoDbConnection = () =>
  IS_OFFLINE ?
    new AWS.DynamoDB.DocumentClient({ endpoint: "http://localhost:8000" }) :
    new AWS.DynamoDB.DocumentClient();

const dynamoDb = createDynamoDbConnection();

const createDatabaseClient = () => ({
  find: async (TableName, id) => {
    const response = await dynamoDb.get({ TableName, Key: { id } }).promise();
    return response.Item;
  },

  all: async (TableName) => {
    const response =  await dynamoDb.scan({ TableName }).promise();
    return response.Items || [];
  },

  save: async (TableName, Item) => {
    await dynamoDb.put({ TableName, Item }).promise();
    return Item;
  },

  update: async (params) => {
    const result = await dynamoDb.update(params).promise();

    return result.Items || [];
  }

});

module.exports = createDatabaseClient;
