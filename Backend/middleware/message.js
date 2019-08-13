module.exports = {
  ResponseText: (message, data) => {
    response = {
      message: message,
      detail: data
    };
    return response;
  }
};
