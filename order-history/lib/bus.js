const AWS = require("aws-sdk");
const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const OFFLINE_AWS_ACCOUNT_ID = "123456789012";
const IS_OFFLINE = eval(process.env.IS_OFFLINE);
const REGION = process.env.SERVERLESS_REGION;
const TOPIC_NAME = process.env.TOPIC_NAME;

const createSnsConnection = () =>
  IS_OFFLINE ?
    new AWS.SNS({ endpoint: "http://127.0.0.1:4002", region: REGION }) :
    new AWS.SNS();

const sns = createSnsConnection();

const buildTopicArn = (topicName) => {
  const accountId = IS_OFFLINE ? OFFLINE_AWS_ACCOUNT_ID : AWS_ACCOUNT_ID;
  const topicArn = `arn:aws:sns:${REGION}:${accountId}:${topicName}`;
  return topicArn;
};

const createEventBusClient = () => {
  return {
    publish: async (event) => {
      let message = JSON.stringify(event);
      console.log('publish message', message);
      const params = {
        Message: message,
        TopicArn: buildTopicArn(TOPIC_NAME)
      };
      return sns.publish(params).promise();
    }
  };
};

module.exports = createEventBusClient;
