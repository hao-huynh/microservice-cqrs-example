const withStatusCode = (statusCode) => {
  if (100 > statusCode || statusCode > 599) {
    throw new Error('status code out of range');
  }
  return (data = null) => {
    const response = {
      statusCode: statusCode,
      headers: { 'Content-Type': 'application/json' },
    };

    // only send a body if there is data
    if (data) {
      response.body = JSON.stringify(data);
    }

    return response;
  }
};


module.exports = {
  withStatusCode
};
