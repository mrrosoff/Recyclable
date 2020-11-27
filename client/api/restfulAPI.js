import axios from 'axios';

export function sendServerRequest(requestType, serverPort=getOriginalServerPort()) {
  const restfulAPI = `${serverPort}/api/${requestType}`;
  const requestOptions = { method: "GET" };
  return processRestfulAPI(restfulAPI, requestOptions);
}

export function sendServerRequestWithBody(requestType, requestBody, serverPort=getOriginalServerPort()) {
  const restfulAPI = `${serverPort}/api/${requestType}`;
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: requestBody
  };
  return processRestfulAPI(restfulAPI, requestOptions);
}

async function processRestfulAPI(restfulAPI, requestOptions) {
  try {
    let response = await axios.post(restfulAPI, requestOptions);
    return { statusCode: response.status, statusText: response.statusText, body: response };
  }
  catch(err) {
    return { statusCode: 404, statusText: 'Resource Not Found', body: null }
  }
}

export function getOriginalServerPort() {
  const serverProtocol = location.protocol;
  const serverHost = location.hostname;
  const serverPort = location.port;
  return `${serverProtocol}\/\/${serverHost}:${serverPort}`;
}
