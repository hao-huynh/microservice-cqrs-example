const parseEvent = message => {
  const messagePayload = message.Records[0].Sns.Message;
  return JSON.parse(messagePayload)
};

module.exports = {
  parseEvent
};
